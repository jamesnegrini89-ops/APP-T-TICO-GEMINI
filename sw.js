const CACHE_NAME = 'tatico-bm-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/icon.jpg',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Ignora requisições para a API do Gemini no cache (precisa de internet)
  if (event.request.url.includes('generativelanguage.googleapis.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Se tem no cache, retorna
        }
        return fetch(event.request); // Senão, busca na rede
      })
  );
});
