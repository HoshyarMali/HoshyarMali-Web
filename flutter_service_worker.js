'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "3d14e74ca3e1bfe752da6bfe372aaf66",
"assets/AssetManifest.bin.json": "7268431f82f207a35515bc24ca3c7f00",
"assets/AssetManifest.json": "9e6cfad62cfe86dcdfb4c69a4c8b12c2",
"assets/assets/fonts/IRANYekanBold.ttf": "feff904d2119753a3b607c209e55448e",
"assets/assets/fonts/IRANYekanExtraBold.ttf": "1fdad39b84aa33d63a84ea82adc3203e",
"assets/assets/fonts/IRANYekanLight.ttf": "f3dc7969d8b796bde4e04a990c51b9f4",
"assets/assets/fonts/IRANYekanMedium.ttf": "b93c843c747e6905339fe81176a13fc4",
"assets/assets/fonts/IRANYekanRegular.ttf": "6d354ae7883f2e3b59359864195cb584",
"assets/assets/images/coin.png": "5fdd7e4645babf1e89b5d6b5690cc426",
"assets/assets/images/doller.png": "b6ffcd3712c989703241d51f18193167",
"assets/assets/images/gold.png": "005dd22dc89957320fbd173d2cf65a45",
"assets/assets/logo.png": "05767331b92aca780144b5a3333b7d4a",
"assets/assets/splash.png": "bdfd8b71ce4fd9b58d4b4f3b5430b1d6",
"assets/FontManifest.json": "57bbbc728c2fc98840b7884b22046b94",
"assets/fonts/MaterialIcons-Regular.otf": "9fa3c5bec8bf672d30e65de72865f4a2",
"assets/NOTICES": "7fa4e1678545245070372c98c0681f80",
"assets/packages/iconly/fonts/IconlyBold.ttf": "6c73fc0a864250644f562a679591e0a4",
"assets/packages/iconly/fonts/IconlyBroken.ttf": "ae60c99d5cf25644beb25a87577bf6ca",
"assets/packages/iconly/fonts/IconlyLight.ttf": "baf08d3e753c86f1bdacb3535d66e2aa",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b",
"favicon.png": "bb407aaa91490392a3657ffda68ceb36",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "bc5e14b9f527b6d5f959e5e2b005b7c0",
"icons/Icon-192.png": "36abe3b441f7017f6a894b528da24427",
"icons/Icon-512.png": "550d315c265e26aef6dcd340b8edd054",
"icons/Icon-maskable-192.png": "36abe3b441f7017f6a894b528da24427",
"icons/Icon-maskable-512.png": "550d315c265e26aef6dcd340b8edd054",
"index.html": "cad1abb7095c6588ee79868ea7f07627",
"/": "cad1abb7095c6588ee79868ea7f07627",
"main.dart.js": "8952ed402dc1430e5d7038f16f02eeb4",
"manifest.json": "f13fd0e85d725fdc8f205753b006f008",
"splash/img/dark-1x.png": "5ec414b7091f881e1130a753a4fb6693",
"splash/img/dark-2x.png": "d6fae662880d436ad0f86dcb5881b787",
"splash/img/dark-3x.png": "76c8ffcd66ce8d29cff9ca01934ed63c",
"splash/img/dark-4x.png": "eba1711d37d4bc8b52e59bebdd848377",
"splash/img/light-1x.png": "5ec414b7091f881e1130a753a4fb6693",
"splash/img/light-2x.png": "d6fae662880d436ad0f86dcb5881b787",
"splash/img/light-3x.png": "76c8ffcd66ce8d29cff9ca01934ed63c",
"splash/img/light-4x.png": "eba1711d37d4bc8b52e59bebdd848377",
"version.json": "7052411f82436468146f8f06db8f6a8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
