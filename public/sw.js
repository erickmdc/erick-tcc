self.importScripts('idb.js');
var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/idb.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        createDB();
        return cache.addAll(urlsToCache);
      })
  );
  console.log('Service worker installing...');
});

self.addEventListener('activate', function (event) {
  console.log('Service worker activating...');
  self.skipWaiting();
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//       caches.match(event.request).then(function(match){
//           return match || fetch(event.request);
//       })
//   );
// });

// I'm a new service worker
self.addEventListener('fetch', function (event) {
  console.log(event.request.url);
});

self.addEventListener('fetch', function (event) {
  // if (event.request.url.includes('/players') && event.request.method === 'GET') {
  //   event.respondWith(returnPlayers(event));
  // }
  // if (event.request.url.includes('/teams') && event.request.method === 'GET') {
  //   event.respondWith(returnTeams(event));
  // }
  // if (event.request.url.includes('/mySquad') && event.request.method === 'GET') {
  //   event.respondWith(returnMySquad(event));
  // }
});

function returnPlayers(event) {
  var init = { "status": 200, "statusText": "ok" };
  if (navigator.onLine) {
    return fetch(event.request)
      .then(res => res.json())
      .then(players => addPlayers(players))
      .then(() => getPlayers())
      .then(players => new Response(JSON.stringify(players), init))
      .catch(e => e);
  } else {
    return getPlayers()
      .then(players => new Response(JSON.stringify(players), init))
      .catch(e => e);
  }
}

function returnTeams(event) {
  var init = { "status": 200, "statusText": "ok" };
  if (navigator.onLine) {
    return fetch(event.request)
      .then(res => res.json())
      .then(teams => addTeams(teams))
      .then(() => getTeams())
      .then(teams => new Response(JSON.stringify(teams), init))
      .catch(e => e);
  } else {
    return getTeams()
      .then(teams => new Response(JSON.stringify(teams), init))
      .catch(e => e);
  }
}

function returnMySquad(event) {
  var init = { "status": 200, "statusText": "ok" };
  if (navigator.onLine) {
    return fetch(event.request)
      .then(res => res.json())
      .then(squad => updateMySquad(squad))
      .then(() => getMySquad())
      .then(mySquad => new Response(JSON.stringify(mySquad), init))
      .catch(e => e);
  } else {
    return getMySquad()
      .then(mySquad => new Response(JSON.stringify(mySquad), init))
      .catch(e => e);
  }
}

function test() {
  return fetch('https://store-tcc.herokuapp.com/teams')
}

function createDB() {
  console.log('Creating');
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
        console.log('Creating name, team and price index');
        store = upgradeDb.transaction.objectStore('players');
        store.createIndex('name', 'name');
        store.createIndex('team', 'team');
        store.createIndex('price', 'price');

      case 2:
        console.log('Creating the teams object store');
        upgradeDb.createObjectStore('teams', { keyPath: 'id' });
        store = upgradeDb.transaction.objectStore('teams');
        store.createIndex('name', 'name');

      case 3:
        console.log('Creating the mySquad object store');
        upgradeDb.createObjectStore('mySquad', { keyPath: 'id' });
        store = upgradeDb.transaction.objectStore('mySquad');
    }
  })
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

    return Promise.all(teams.map(item => store.put(item)))
      .catch(e => {
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

function addPlayers(players) {
  // dumb objects
  idb.open('cartola-database').then(async function (db) {
    var tx = db.transaction('players', 'readwrite');
    var store = tx.objectStore('players');

    return Promise.all(players.map(player => store.put(player)))
      .catch(e => {
        tx.abort();
        console.log(e);
      }).then(() => {
        console.log('All players added successfully!');
      });
  });
}

function getPlayers() {
  return idb.open('cartola-database').then(db => {
    var tx = db.transaction('players', 'readonly');
    var store = tx.objectStore('players');
    return store.getAll();
  });
}

function updateMySquad(mySquad) {
  idb.open('cartola-database').then(async function (db) {
    var tx = db.transaction('mySquad', 'readwrite');
    var store = tx.objectStore('mySquad');

    return store.clear().then(() => {
      return Promise.all(mySquad.map(player => store.put(player)))
        .catch(e => {
          tx.abort();
          console.log(e);
        }).then(() => {
          console.log('All players saved on MySquad successfully!');
        });
    })
  });
}

function getMySquad() {
  return idb.open('cartola-database').then(db => {
    var tx = db.transaction('mySquad', 'readonly');
    var store = tx.objectStore('mySquad');
    return store.getAll();
  });
}

function orderById(a, b) {
  if (parseInt(a.id) < parseInt(b.id))
    return -1;

  if (parseInt(a.id) > parseInt(b.id))
    return 1;

  if (parseInt(a.id) === parseInt(b.id))
    return 0;
}