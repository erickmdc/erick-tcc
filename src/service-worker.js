(function() {
    'use strict';
  
    self.addEventListener('install', function(event) {
      console.log('Service worker installing...');
      self.skipWaiting();
    });
  
    self.addEventListener('activate', function(event) {
      console.log('Service worker activating...');
    });
  
    // I'm a new service worker
  
    self.addEventListener('fetch', function(event) {
      console.log('Fetching:', event.request.url);
    });

    const db = new DB();

    self.addEventListener('fetch', event => {
      console.log("aqui");
      if (event.request.method !== 'GET') return;
      event.respondWith(async function() {
        const players = await db.getPlayers();
        if (players) {
          event.waitUntil(db.addPlayers(event.request));
          return players;
        }
        // If we didn't find a match in the cache, use the network.
        return fetch(event.request).then(response => db.addPlayers(response)).then(response => response);
      }());
    });
  
})();