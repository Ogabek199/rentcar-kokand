/* eslint-disable no-restricted-globals */

// Service worker versiyasini har gal yangilash
const CACHE_VERSION = "v2"; 
const STATIC_CACHE = `rentcar-static-${CACHE_VERSION}`;

// Precache qilish uchun muhim fayllar
const PRECACHE_URLS = [
  "/offline.html",
  "/manifest.json",
  "/robots.txt",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((k) => k.startsWith("rentcar-static-") && k !== STATIC_CACHE)
          .map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // GET so'rovlarini tahlil qilish
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // 1. Navigation (HTML sahifalar) - Network-first, agar xato bo'lsa offline sahifa
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // 2. Statik assetlar (JS, CSS, Img) - Cache-first (yaxshilangan)
  if (
    url.pathname.startsWith("/static/") ||
    /\.(?:js|css|png|jpg|jpeg|webp|gif|svg|ico)$/.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Agar cache bo'lsa, uni qaytar
        if (cachedResponse) return cachedResponse;
        
        // Bo'lmasa, tarmoqdan yukla va cache'ga saqla
        return fetch(request).then((networkResponse) => {
          // Chunklar yuklanmaganda cache'ni ifloslantirmaslik uchun tekshiruv
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
  }
});
