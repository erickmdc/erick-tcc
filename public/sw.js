self.importScripts('idb.js');

self.addEventListener('install', function (event) {
  console.log('Service worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  createDB();
  console.log('Service worker activating...');
});

// I'm a new service worker

self.addEventListener('fetch', function (event) {
  if(event.request.url.includes('/players')) {
    console.log('Fetching:', event.request.url);
    return getPlayers();
  }
});

self.addEventListener('fetch', function (event) {
  if(event.request.url.includes('/teams')) {
    console.log('Fetching:', event.request.url);
    return getPlayers();
  }
});

function createDB() {
  idb.open('cartola-database', 1, upgradeDb => {
    let store;
    switch (upgradeDb.oldVersion) {
      case 0:
      // a placeholder case so that the switch block will
      // execute when the database is first created
      // (oldVersion is 0)
      case 1:
        console.log('Creating the players object store');
        upgradeDb.createObjectStore('players', { keyPath: 'id' });

      case 2:
        console.log('Creating a name index');
        store = upgradeDb.transaction.objectStore('players');
        store.createIndex('name', 'name', { unique: true });

      case 3:
        console.log('Creating a team and price index');
        store = upgradeDb.transaction.objectStore('players');
        store.createIndex('team', 'team');
        store.createIndex('price', 'price');

      case 4:
        console.log('Creating the teams object store');
        upgradeDb.createObjectStore('teams', { keyPath: 'id' });

      case 5:
        console.log('Creating a name index');
        store = upgradeDb.transaction.objectStore('teams');
        store.createIndex('name', 'name', { unique: true });
    }
  })
}

function addPlayers(players) {
  // dumb objects
  idb.open('cartola-database').then(db => {
    var tx = db.transaction('players', 'readwrite');
    var store = tx.objectStore('players');

    return Promise.all(players.map(player => {
      console.log('Adding player: ', player.name);
      return store.add(player);
    })
    ).catch(e => {
      tx.abort();
      console.log(e);
    }).then(() => {
      console.log('All players added successfully!');
    });
  });
}

function getByName(key) {
  return idb.open('cartola-database').then(function (db) {
    var tx = db.transaction('players', 'readonly');
    var store = tx.objectStore('players');
    var index = store.index('name');
    return index.get(key);
  });
}

function getByPrice(lower, upper) {

  let range = IDBKeyRange.bound(lower, upper);

  let elements = [];
  return idb.open('cartola-database').then(function (db) {
    let tx = db.transaction('players', 'readonly');
    let store = tx.objectStore('players');
    let index = store.index('price');
    return index.openCursor(range);
  }).then(cursor => {
    if (!cursor) { return; }
    elements.push(cursor.value);
    return cursor.continue();
  }).then(() => {
    return elements;
  });
}

function getByTeam(key) {
  if (key === '') { return; }
  let range = IDBKeyRange.only(key);

  let elements = [];
  return idb.open('cartola-database').then(function (db) {
    let tx = db.transaction('players', 'readonly');
    let store = tx.objectStore('players');
    let index = store.index('team');
    return index.openCursor(range);
  }).then(cursor => {
    if (!cursor) { return; }
    elements.push(cursor.value);
    return cursor.continue();
  }).then(() => {
    return elements;
  });
}

function addTeams(teams) {
  idb.open('cartola-database').then(db => {
    let tx = db.transaction('teams', 'readwrite');
    let store = tx.objectStore('teams');

    return Promise.all(teams.map(item => {
      console.log('Adding item: ', item);
      return store.add(item);
    })
    ).catch(e => {
      tx.abort();
      console.log(e);
    }).then(() => {
      console.log('All items added successfully!');
    });
  });
}

function getTeams() {
  return idb.open('cartola-database').then(db => {
    var tx = db.transaction('teams', 'readonly');
    var store = tx.objectStore('teams');
    return store.getAll();
  });
}

function getPlayers() {
  return idb.open('cartola-database').then(db => {
    var tx = db.transaction('players', 'readonly');
    var store = tx.objectStore('players');
    return store.getAll();
  });
}

// self.addEventListener('fetch', event => {
//   console.log("aqui");
//   //const db = idb;
//   if (event.request.method !== 'GET') return;
//   event.respondWith(async function () {
//     //const players = await db.getPlayers();
//     if (players) {
//       event.waitUntil(db.addPlayers(event.request));
//       return players;
//     }
//     // If we didn't find a match in the cache, use the network. // " && sw-precache --config=sw-precache-config.js",
//     return fetch(event.request).then(response => db.addPlayers(response)).then(response => response);
//   }());
// });