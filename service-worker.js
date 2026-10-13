/* eslint-disable no-restricted-globals */
// Minimal service worker for CRA static hosting (no Workbox injection).
// - Cache static assets (cache-first)
// - Network-first for navigation, fallback to /offline.html

const CACHE_VERSION = "v1";
const STATIC_CACHE = `rentcar-static-${CACHE_VERSION}`;

const PRECACHE_URLS = ["/offline.html", "/manifest.json", "/robots.txt", "/sitemap.xml",];

self.addEventListener("install", (event) => {
    event.waitUntil(caches
        .open(STATIC_CACHE)
        .then((cache) => cache.addAll(PRECACHE_URLS))
        .then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys
            .filter((k) => k.startsWith("rentcar-static-") && k !== STATIC_CACHE)
            .map((k) => caches.delete(k)));
        await self.clients.claim();
    })());
});

function isNavigationRequest(request) {
    return request.mode === "navigate" || (request.method === "GET" && request.headers.get("accept")?.includes("text/html"));
}

self.addEventListener("fetch", (event) => {
    const {request} = event;
    if (request.method !== "GET") return;

    // Network-first for SPA navigations
    if (isNavigationRequest(request)) {
        event.respondWith((async () => {
            try {
                const response = await fetch(request);
                const cache = await caches.open(STATIC_CACHE);
                cache.put(request, response.clone()).catch(() => {
                });
                return response;
            } catch (err) {
                // Try cached page first, then offline fallback
                const cached = await caches.match(request);
                return cached || caches.match("/offline.html");
            }
        })());
        return;
    }

    // Cache-first for build assets and images/fonts
    const url = new URL(request.url);
    const isStaticAsset = url.pathname.startsWith("/static/") || /\.(?:js|css|png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|eot)$/.test(url.pathname);

    if (isStaticAsset) {
        event.respondWith((async () => {
            const cached = await caches.match(request);
            if (cached) return cached;
            const response = await fetch(request);
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, response.clone()).catch(() => {
            });
            return response;
        })());
    }
});