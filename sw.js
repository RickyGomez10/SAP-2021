var CACHE_NAME = 'offline-v0.1';
var urlsToCache = [
  '/',
  '/css/style.css',
  '/jq/jquery.min.js',
  '/idb/index-min.js'
];

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
    demo()
  );

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

async function demo() {
  const db = await idb.openDB('Articles', 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore('articles', {
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
  await db.add('articles', {
    title: 'Article 1',
    date: new Date('2019-01-01'),
    body: '…',
  });

  // Add multiple articles in one transaction:
  {
    const tx = db.transaction('articles', 'readwrite');
    await Promise.all([
      tx.store.add({
        title: 'Article 2',
        date: new Date('2019-01-01'),
        body: '…',
      }),
      tx.store.add({
        title: 'Article 3',
        date: new Date('2019-01-02'),
        body: '…',
      }),
      tx.done,
    ]);
  }

  // Get all the articles in date order:
  console.log(await db.getAllFromIndex('articles', 'date'));

}