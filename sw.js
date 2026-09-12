self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('imcg-cache').then(cache => {
      return cache.addAll([
        '/IMCG--RESULTPORTAL/',
        '/IMCG--RESULTPORTAL/index.html'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
