const CACHE_NAME = 'goldhen-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './GoldHEN.bin'
];

// تثبيت ملفات الكاش في الذاكرة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل وتحسين الكاش والتخلص من القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// استدعاء الملفات مباشرة من الكاش عند انقطاع الإنترنت (Offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
