const CACHE_NAME = "biblia-pwa-v4";
const ASSETS_TO_CACHE = [
    "/",
    "/dashboard",
    "/learn",
    "/kids",
    "/manifest.webmanifest",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    // Bypass SW caching for internal Next.js HMR and prefetch requests to avoid conflicts
    if (event.request.url.includes("/_next/webpack-hmr") || event.request.url.includes("/_next/data")) return;

    // NETWORK-FIRST STRATEGY: Always try network to get the freshest app state, 
    // Fallback to cache only if offline or network fails.
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // If the response is good, clone it and cache it for offline use
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // Fallback to cache on network failure (offline mode)
                return caches.match(event.request);
            })
    );
});
