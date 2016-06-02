const cacheConfig = {
  maxAge: 60 * 60 * 1000,
  deleteOnExpire: 'aggressive',
  recycleFreq: 60000,
};

const getOrCreateCache = function (CacheFactory, cacheName) {
  const cache = CacheFactory.get(cacheName);
  if (cache) {
    return cache;
  } else {
    return CacheFactory.createCache(cacheName, cacheConfig);
  }
};

export default {
  getOrCreateCache: getOrCreateCache,
  bustCache: function (CacheFactory, cacheName) {
    getOrCreateCache(CacheFactory, cacheName).destroy();
  },
};
