import { lazy } from "react";

const CHUNK_RELOAD_KEY = "page-has-been-force-refreshed";

function isChunkLoadError(error) {
  if (!error) return false;
  if (error.name === "ChunkLoadError") return true;
  const msg = String(error.message || error);
  return (
    /loading (css )?chunk [\d]+ failed/i.test(msg) ||
    /failed to fetch dynamically imported module/i.test(msg) ||
    /importing a module script failed/i.test(msg) ||
    /error loading (css )?chunk/i.test(msg)
  );
}

/**
 * React.lazy uchun wrapper: chunk yuklanmasa (deploy keyin eski cache, tarmoq va h.k.)
 * bir marta qayta urinadi, keyin bitta marta sahifani yangilaydi — yangi asset hash bilan.
 */
function lazyWithRetry(factory) {
  return lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem(CHUNK_RELOAD_KEY) || "false"
    );

    try {
      const moduleExports = await factory();
      window.sessionStorage.setItem(CHUNK_RELOAD_KEY, "false");
      return moduleExports;
    } catch (error) {
      if (!isChunkLoadError(error)) {
        throw error;
      }
      try {
        await new Promise((r) => setTimeout(r, 200));
        const moduleExports = await factory();
        window.sessionStorage.setItem(CHUNK_RELOAD_KEY, "false");
        return moduleExports;
      } catch (retryErr) {
        if (!isChunkLoadError(retryErr)) {
          throw retryErr;
        }
        if (!pageHasAlreadyBeenForceRefreshed) {
          window.sessionStorage.setItem(CHUNK_RELOAD_KEY, "true");
          window.location.reload();
          return new Promise(() => {});
        }
        throw retryErr;
      }
    }
  });
}

export default lazyWithRetry;
