/**
 * apiCache.js
 *
 * Lightweight Stale-While-Revalidate cache using sessionStorage.
 * - On first call: fetch from network, store result, return data.
 * - On subsequent calls: return cached data immediately (zero wait)
 *   and silently refetch in the background to keep the cache fresh.
 *
 * TTL default: 5 minutes (300_000 ms)
 */

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * @param {string} url - API endpoint to fetch
 * @param {function} onData - callback receiving fresh/cached data
 * @param {function} onError - callback receiving error
 * @param {number} [ttl] - cache time-to-live in milliseconds
 */
export function fetchWithCache(url, onData, onError, ttl = DEFAULT_TTL) {
  const cacheKey = `api_cache:${url}`;

  let cached = null;
  try {
    const raw = sessionStorage.getItem(cacheKey);
    if (raw) cached = JSON.parse(raw);
  } catch {
    // sessionStorage unavailable or corrupt — proceed with network fetch
  }

  const isStale =
    !cached || !cached.ts || Date.now() - cached.ts > ttl;

  if (cached && !isStale) {
    // Fresh cache — deliver immediately, no network request needed
    onData(cached.data);
    return;
  }

  if (cached && isStale) {
    // Stale cache — deliver stale data immediately while revalidating
    onData(cached.data);
  }

  // Fetch from network (first load or background revalidation)
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ data, ts: Date.now() }));
      } catch {
        // Ignore storage quota errors
      }
      onData(data);
    })
    .catch((err) => {
      // Only surface the error to the UI if we have no cached fallback
      if (!cached) onError(err);
    });
}
