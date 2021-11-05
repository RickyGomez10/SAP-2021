const CACHE_NAME = 'offline-v0.1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/bs/safely.css',
  '/bjs/bootstrap.bundle.min.js.map',
  '/jq/jquery.min.js',
  '/idb/index-min.js',
  '/swal/sweetalert2.all.min.js'
];
const LOCAL_DB_NAME = 'dbSAP';
var statusDelete = false;

if (typeof idb === "undefined") self.importScripts("/idb/index-min.js");

self.addEventListener('install', function (event) {

  console.log('Service worker installed.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

/*self.addEventListener('activate', function (event) {
  console.log('Service worker activated.');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== CACHE_NAME + ' - http://localhost:3000'){
            console.log('Clearing old cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});*/

self.addEventListener('activate', function (event) {

  var cacheAllowlist = ['offline-v0.1'];
  console.log('Service worker activated.');

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            console.log('Clearing old cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  console.log('Fetching...');
  event.respondWith(async function() {
      try {
        return await fetch(event.request);
      } catch (err) {
        return caches.match(event.request);
      }
    }());
});

addEventListener('message', event => {
  let data = JSON.parse(event.data);
  if (data.action == 'guardar_avaluo') {
    event.waitUntil(
      storeData(data.form)
    );
    event.source.postMessage("saved");
  }

  if (data.action == 'borrar_avaluo') {
    event.waitUntil(
      deleteData(data.form)
    );
  }

  if (data.action == 'buscar_avaluo') {
    event.waitUntil(
      findData(data.idAvaluo, event)
    );
  }

});

async function storeData(data) {
  const db = await getDB();

  const store = db.transaction('avaluos').objectStore('avaluos');
  let result = await store.get(data.idAvaluo);

  if(result){
    await db.put('avaluos', {
      idAvaluo: data.idAvaluo,
      form: data
    });
  }else{
    await db.add('avaluos', {
      idAvaluo: data.idAvaluo,
      form: data
    });
  }
}

async function findData(data, event) {
  const db = await getDB();

  const store = db.transaction('avaluos').objectStore('avaluos');
  let result = await store.get(data);

  if(result){
    event.source.postMessage(JSON.stringify(result));
  }
}

async function deleteData(data) {
  const db = await getDB();

  const store = db.transaction('avaluos').objectStore('avaluos');
  let result = await store.get(data.idAvaluo);

  if(result){
    await db.delete('avaluos', data.idAvaluo);
  }
}

async function getDB(){
  return await idb.openDB(LOCAL_DB_NAME, 1, {
    upgrade(db) {
      const store = db.createObjectStore(
        'avaluos',
        {
          keyPath: 'idAvaluo',
          autoIncrement: true,
        }
      );
      store.createIndex('date', 'date');
    },
  });
}