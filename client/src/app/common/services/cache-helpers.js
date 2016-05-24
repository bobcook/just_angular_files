const cacheConfig = {
  maxAge: 60 * 60 * 1000,
  deleteOnExpire: 'aggressive',
  recycleFreq: 60000,
};

export default {
  getOrCreateCache: function (CacheFactory, cacheName) {
    const cache = CacheFactory.get(cacheName);
    if (cache) {
      return cache;
    } else {
      return CacheFactory.createCache(cacheName, cacheConfig);
    }
  },
};
