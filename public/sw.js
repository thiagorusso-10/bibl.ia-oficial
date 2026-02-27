const CACHE_NAME = "biblia-pwa-v2";
const ASSETS_TO_CACHE = [
    "/",
    "/dashboard",
    "/learn",
    "/kids",
    "/manifest.json",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
];

// Install event: cache core assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
                console.error("Failed to cache assets:", err);
            });
        })
    );
    self.skipWaiting();
});

// Activate event: clean old caches
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

// Fetch event: network first, fallback to cache (for pages)
// Stale-while-revalidate for assets
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Ignore non-http (chrome-extension, etc)
    if (!url.protocol.startsWith("http")) return;

    // Strat: Stale-while-revalidate for static assets
    if (
        url.pathname.startsWith("/_next/static") ||
        url.pathname.match(/\.(png|jpg|jpeg|svg|css|js|json)$/)
    ) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((cachedResponse) => {
                    const fetchPromise = fetch(event.request).then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                    return cachedResponse || fetchPromise;
                });
            })
        );
        return;
    }

    // Strat: Network first for HTML/Data
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
