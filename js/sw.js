const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/style.css',
  '/styles/style.css.map',
  '/styles/styles.css',
  '/scss/style.scss',
  '.htaccess',
  '404.html',
  '/contacts.html',
  '/portfolio.html',
  '/js/index.js',
  '/images/image-background-2.svg',
  '/images/fasfox.png',
  '/images/inawo.png',
  '/images/faconsulting.png',
  '/images/topformation.png',
  '/images/eisine.png',
  '/images/images-removebg-preview (1).png',
  '/images/Codes en Ardennes.png',
  '/images/figma-logo-0.png',
  '/images/tailwindcss_logo_icon_170649.png',
  '/images/o2switch-deployer-react.js.png',
  '/images/Dépenses.png',
  '/images/vecteezy_wordpress-logo-png-wordpress-icon-transparent-png_20975579.png',
  '/images/Bootstrap_logo.svg.png',
  '/images/tailwindcss_logo_icon_170649.png',
  '/images/o2switch-deployer-react.js.png',
  '/images/crm.png',
  '/images/tailwindcss_logo_icon_170649.png',
  '/images/nextjs-icon-512x309-yynfidez.png',
  '/images/Staffdispatch.png',
  '/images/figma-logo-0.png',
  '/images/Makover.jpg',
  '/images/figma-logo-0.png',
  '/images/Detail produit prototype.png',
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/76.png',
  '/images/512.png',
  '/images/256.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
