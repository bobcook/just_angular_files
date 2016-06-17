import infiniteScrollHelpers from './infinite-scroll-helpers';
import cacheHelpers from './cache-helpers';

describe('infinite-scroll-helpers', function () {
  beforeEach(loadApp);

  let CacheFactory;
  let $rootScope;
  beforeEach(inject(function (_CacheFactory_, _$rootScope_) {
    CacheFactory = _CacheFactory_;
    $rootScope = _$rootScope_;

    CacheFactory.clearAll();
  }));

  const statesWithCache = [
    'application.articles',
    'application.games',
    'application.activities',
    'application.recipes',
    'application.home',
  ];

  describe('cachePageNumber', function () {
    it('caches pageNumber for states with caching', function () {
      const testPageNumber = 3;
      statesWithCache.forEach(function (state) {
        const subject = infiniteScrollHelpers(state, CacheFactory);
        subject.cachePageNumber(testPageNumber);

        expect(subject.getLastSeenPageNumber()).to.eq(testPageNumber);
      });
    });

    it('does not cache pageNumber for states without caching', function () {
      const testPageNumber = 3;
      const subject = infiniteScrollHelpers('bogus.route', CacheFactory);
      subject.cachePageNumber(testPageNumber);

      expect(subject.getLastSeenPageNumber()).to.not.eq(testPageNumber);
    });

    it('returns undefined for states without caching', function () {
      const testPageNumber = 3;
      const subject = infiniteScrollHelpers('bogus.route', CacheFactory);
      subject.cachePageNumber(testPageNumber);

      expect(subject.getLastSeenPageNumber()).to.eq(undefined);
    });
  });

  describe('stateWillBeCached', function () {
    it('is true for states with caching', function () {
      statesWithCache.forEach(function (state) {
        const subject = infiniteScrollHelpers(state, CacheFactory);

        expect(subject.stateWillBeCached()).to.eq(true);
      });
    });
    it('is false for states without caching', function () {
      const subject = infiniteScrollHelpers('bogus.route', CacheFactory);

      expect(subject.stateWillBeCached()).to.eq(false);
    });
  });

  describe('getLastSeenPageNumber', function () {
    it('returns most recently cached page number for states with caching',
      function () {
        const testPageNumber = 3;
        statesWithCache.forEach(function (state) {
          const subject = infiniteScrollHelpers(state, CacheFactory);
          subject.cachePageNumber(testPageNumber);

          expect(subject.getLastSeenPageNumber()).to.eq(testPageNumber);
        });
      }
    );

    it('returns undefined for states without caching', function () {
      const testPageNumber = 3;
      const subject = infiniteScrollHelpers('bogus.route', CacheFactory);
      subject.cachePageNumber(testPageNumber);

      expect(subject.getLastSeenPageNumber()).to.eq(undefined);
    });
  });

  describe('trackPageNumber', function () {
    it('caches the page number', function () {
      statesWithCache.forEach(function (state) {
        const subject = infiniteScrollHelpers(state, CacheFactory);
        const testPageNumber = 3;
        subject.trackPageNumber('bogusSelector', $rootScope, testPageNumber);
        $(window).scroll();

        expect(subject.getLastSeenPageNumber()).to.eq(testPageNumber);
      });
    });

    it('adds an event handler', function () {
      statesWithCache.forEach(function (state) {
        const subject = infiniteScrollHelpers(state, CacheFactory);
        const scrollHandlersCount = $._data(window, 'events').scroll.length;
        subject.trackPageNumber('bogusSelector', $rootScope, 4);

        expect($._data(window, 'events').scroll.length)
          .to.eq(scrollHandlersCount+1);
      });
    });
  });

  describe('scrollToPage', function () {
    it('needs an end-to-end test');
  });

});
