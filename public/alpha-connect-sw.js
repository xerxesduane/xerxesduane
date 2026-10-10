// Alpha Connect's service worker. It lives at the root so it can be
// registered with the scope /alpha-connect (src/alpha/lib/pwa.ts), and it
// controls nothing else on the ministry host.
const CACHE = 'alpha-connect-v3';
const APP_SHELL = ['/alpha-connect', '/alpha/manifest.webmanifest', '/alpha/icons/icon-192.png', '/alpha/icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('alpha-connect') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // CSV from Google Sheets — stale-while-revalidate
  if (url.hostname === 'docs.google.com') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      const networkPromise = fetch(req).then((res) => {
        if (res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || networkPromise;
    })());
    return;
  }

  // Cloudinary images — cache-first
  if (url.hostname.endsWith('cloudinary.com') || url.hostname === 'img.youtube.com') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      if (cached) return cached;
      const res = await fetch(req);
      if (res.ok) cache.put(req, res.clone());
      return res;
    })());
    return;
  }

  // Navigation requests — network-first, fall back to cached shell
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        return res;
      } catch {
        const cache = await caches.open(CACHE);
        return (await cache.match('/alpha-connect')) || Response.error();
      }
    })());
    return;
  }
});
