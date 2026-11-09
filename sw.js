// JD Enterprise launcher — minimal service worker.
//
// Its only job is to exist with a real, non-empty fetch handler: Chrome
// on Android won't offer "Install app" for a page whose service worker
// has an empty fetch handler, and this page needs that install prompt
// to work. It does NOT cache the actual app — that content lives behind
// Google's own domain (script.google.com / googleusercontent.com), is
// authenticated per PIN session, and is not this worker's to cache.
const CACHE_NAME = 'jd-shell-v1';

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
});
