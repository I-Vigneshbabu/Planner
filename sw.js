// Service Worker for IPL - Input Planner List
// Enables offline functionality and caching

// Increment the cache version when you update the app shell.
const CACHE_NAME = 'planner-v3';
const urlsToCache = [
    '/',
    '/index.html',
    '/daily-planner',
    '/weekly-planner',
    '/study-planner',
    '/habit-tracker',
    '/goal-planner',
    '/meal-planner',
    '/budget-planner',
    '/ipl',
    '/styles.css',
    '/app.js',
    // It's good practice to cache your main icon/logo
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="75" font-size="80" text-anchor="middle">📋</text></svg>'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache).catch(err => {
                    console.log('Cache addAll failed:', err);
                    // Continue even if some resources fail to cache
                    return Promise.resolve();
                });
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Network first strategy for API calls
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Cache successful responses
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, clone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if network fails
                    return caches.match(event.request)
                        .then(response => response || new Response('Offline', { status: 503 }));
                })
        );
        return;
    }

    // Cache first strategy for static assets
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request)
                    .then(response => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Return a fallback for failed requests
                        return new Response('Offline', { status: 503 });
                    });
            })
    );
});

// Background Sync for future notifications
self.addEventListener('sync', event => {
    if (event.tag === 'sync-notifications') {
        event.waitUntil(
            // Synchronize notifications when back online
            Promise.resolve()
        );
    }
});

// Push notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New notification',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="75" font-size="80" text-anchor="middle">📋</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="75" font-size="80" text-anchor="middle">📌</text></svg>'
    };

    event.waitUntil(
        self.registration.showNotification('IPL Planner', options)
    );
});
