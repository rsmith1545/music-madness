/* eslint-disable no-undef */
var cacheName = 'ft-madness-v1';
var assets = [
  './',
  './index.html',
  './manifest.json',
  'https://upload.wikimedia.org/wikipedia/commons/4/4d/Frank_Turner_silhouette.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== cacheName;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});