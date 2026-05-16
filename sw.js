const CACHE_NAME = "word-quest-summer-v35";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=20",
  "./app.js?v=34",
  "./word-lists.js?v=2",
  "./generated-clues.js?v=2",
  "./manifest.webmanifest",
  "./icon.svg",
  "./assets/app-icon-192.png",
  "./assets/app-icon-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/midvale-logo.jpg?v=1",
  "./assets/winslow-photo.jpg?v=2",
  "./assets/beck-photo.jpg?v=2",
  "./assets/thurston-photo.jpg?v=1",
  "./assets/godzilla-marker.jpg?v=1",
  "./assets/joker-marker.jpg?v=2",
  "./assets/cheetah-marker.jpg?v=1"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
