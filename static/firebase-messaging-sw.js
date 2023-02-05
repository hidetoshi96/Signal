// importScripts('/__/firebase/9.2.0/firebase-app-compat.js');
// importScripts('/__/firebase/9.2.0/firebase-messaging-compat.js');
// importScripts('/__/firebase/init.js');
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);
firebase.initializeApp({
  apiKey: 'AIzaSyDLuQUzqDAvWi75rMkYaR8XGWGUW3SS94E',
  authDomain: 'noble-vine-369311.firebaseapp.com',
  databaseURL:
    'https://noble-vine-369311-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'noble-vine-369311',
  storageBucket: 'noble-vine-369311.appspot.com',
  messagingSenderId: '94687119429',
  appId: '1:94687119429:web:6d2080a1d3f92853f77b2c',
  measurementId: 'G-7KK9WN5V0T',
});
firebase.messaging();

importScripts('<%= options.workboxUrl %>');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

const { registerRoute } = workbox.routing;
const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

// Cache page navigations (html) with a Network First strategy
registerRoute(
  ({ request }) => {
    return request.mode === 'navigate';
  },
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
);

// Cache Web Manifest, CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  ({ request }) =>
    request.destination === 'manifest' ||
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
);

// Cache images with a Cache First strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      // 50 entries max, 30 days max
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  })
);
