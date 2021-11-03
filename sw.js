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
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

addEventListener('message', event => {
  let data = JSON.parse(event.data);
  if(data.action == 'guardar_avaluo'){
    //deleteLocalDB()
    console.log('Guardando localmente avalúo');
    console.log(data.form);
    event.waitUntil(
      storeData(data.form)
    );
    event.source.postMessage("Avalúo guardado localmente.");
  }
});

async function storeData(data) {
  const db = await idb.openDB(LOCAL_DB_NAME, 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore('avaluos', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
      // Create an index on the 'date' property of the objects.
      store.createIndex('date', 'date');
    },
  });

  // Add an article:
  await db.add('avaluos', data);

  // Get all the articles in date order:
  console.log(await db.getAllFromIndex('avaluos', 'date'));

}