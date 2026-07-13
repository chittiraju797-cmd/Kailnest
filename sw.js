const CACHE_NAME = 'kailnest-v1';
const URLS_TO_CACHE = [
  '/Kailnest/',
  '/Kailnest/index.html',
  '/Kailnest/app.jsx',
  '/Kailnest/manifest.json'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch - Network first, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Push Notifications
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Kailnest నుండి notification',
    icon: 'https://raw.githubusercontent.com/chittiraju797-cmd/Kailnest/main/1782926117778.png',
    badge: 'https://raw.githubusercontent.com/chittiraju797-cmd/Kailnest/main/1782926117778.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/Kailnest/' },
    actions: [
      { action: 'open', title: 'చూడు' },
      { action: 'close', title: 'Close' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'Kailnest', options)
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
