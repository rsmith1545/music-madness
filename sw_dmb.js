var cacheName = 'dmb-madness-v2';
var assets = ['./', './index.html', './manifest_dmb.json'];
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(cacheName).then(function(c) { return c.addAll(assets); }));
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(ks) {
    return Promise.all(ks.map(function(k) { if(k !== cacheName) return caches.delete(k); }));
  }));
});
self.addEventListener('fetch', function(e) {
  e.respondWith(caches.match(e.request).then(function(r) { return r || fetch(e.request); }));
});