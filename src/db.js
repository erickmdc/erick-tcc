import idb from 'idb';

export default class DB {
    dbPromise = idb.open('cartola-database', 1, upgradeDb => {
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
    });

    addPlayers = players => {
        // dumb objects
        this.dbPromise.then(db => {
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

    getByName = key => {
        return this.dbPromise.then(function (db) {
            var tx = db.transaction('players', 'readonly');
            var store = tx.objectStore('players');
            var index = store.index('name');
            return index.get(key);
        });
    }

    getByPrice = (lower, upper) => {

        let range = IDBKeyRange.bound(lower, upper);

        let elements = [];
        return this.dbPromise.then(function (db) {
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

    getByTeam = key => {
        if (key === '') { return; }
        let range = IDBKeyRange.only(key);

        let elements = [];
        return this.dbPromise.then(function (db) {
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

    addTeams = teams => {
        this.dbPromise.then(db => {
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

    getTeams = () => {
        return this.dbPromise.then(db => {
          var tx = db.transaction('teams', 'readonly');
          var store = tx.objectStore('teams');
          return store.getAll();
        });
    }

    getPlayers = () => {
        return this.dbPromise.then(db => {
          var tx = db.transaction('players', 'readonly');
          var store = tx.objectStore('players');
          return store.getAll();
        });
    }

    // getTeamPlayers() {
    //     let s = '';
    
    //     getTeams().then(async function (teams) {
    //       for(let team of teams) {
            
    //         console.log('Cursored at team:', team.name);
    //         s += '<h2>'+ team.name +'</h2>';
      
    //         await this.dbPromise.then(function getPlayers(db1) {
    //           let ts = db1.transaction('players', 'readonly');
    //           let store1 = ts.objectStore('players');
    //           let index1 = store1.index('team');
    //           let range = IDBKeyRange.only(team.name);
    //           return index1.getAll(range);
    //         }).then(function (players) {
    //           for(let player of players) {
    //             console.log('Cursored at player:', player.name);
    //             s += '<p>'+ player.name +'</p>';
    //           }
    //         });
    //       }
    //     }).then(function () {
    //       if (s === '') {s = '<p>No results.</p>';}
    //       document.getElementById('squads').innerHTML = s;
    //     });
    // }
}