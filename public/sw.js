self.importScripts('idb.js');

self.addEventListener('install', function (event) {
  event.waitUntil(createDB());
  console.log('Service worker installing...');
});

self.addEventListener('activate', function (event) {
  console.log('Service worker activating...');
});

// I'm a new service worker

self.addEventListener('fetch', function (event) {
  if (event.request.url.includes('/players')) {
    var init = { "status" : 200, "statusText": "ok" };
    event.respondWith(getPlayers().then(players => new Response(players, init)));
    event.waitUntil(update(event.request))
    //.then(response => refresh(response)));
  }
});

// self.addEventListener('fetch', function (event) {
//   if (event.request.url.includes('/teams')) {
//     console.log('Fetching:', event.request.url);
//     return getPlayers();
//   }
// });

function update(request) {
  return fetch(request)
    .then(res => res.json())
    .then(players => {
      addPlayers(players);
      return players;
    });
}

function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      var message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag')
      };
      client.postMessage(JSON.stringify(message));
    });
  });
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