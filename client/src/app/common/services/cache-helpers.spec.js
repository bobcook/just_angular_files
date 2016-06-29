import cacheHelper from './cache-helpers';
describe('cache-helpers', function () {
  beforeEach(loadApp);

  let CacheFactory;

  beforeEach(inject(function (_CacheFactory_, _$rootScope_) {
    CacheFactory = _CacheFactory_;
  }));

  it('create the new cache', function () {

    const cache = cacheHelper.getOrCreateCache(CacheFactory, 'newCache');

    expect(cache['$$id']).to.eq('newCache');
  });

  it('create the new cache', function () {

    const cache = cacheHelper.getOrCreateCache(CacheFactory, 'newCache');
    const deleteCache = cacheHelper.bustCache(CacheFactory, cache['$$id']);

    // after deleting the cache
    expect(typeof deleteCache).to.eq('undefined');
  });

});
