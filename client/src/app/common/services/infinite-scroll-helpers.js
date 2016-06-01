import cacheHelpers from './cache-helpers';

const scrollToPage = function (selector, page, $timeout) {
  if (page === 1) { return $(window).scrollTop(0); }
  const query = `${selector}[data-pagenum="${page}"]`;
  $timeout(function () {
    if (!_.isEmpty($(query))) {
      $(window).scrollTop($(query).offset().top);
    }
  }, 0);
};

const statesToCache = {
  'application.activities': 'Activity',
  'application.articles': 'Article',
  'application.recipes': 'Recipe',
  'application.games': 'Game',
  'application.home': 'ExploreAll',
};

const isElementVisible = (el) => {
  return el.getBoundingClientRect().bottom >= 0;
};

const currentPageNumber = (selector) => {
  const topElement = _.find($(selector), isElementVisible);
  return $(topElement).data('pagenum');
};

export default (function (stateName, CacheFactory) {
  const trackPageNumber = function (selector, $rootScope) {
    $(window).on('scroll', function bindToScroll() {
      $rootScope.$on('$stateChangeStart', function () {
        $(window).off('scroll', bindToScroll);
      });
      const pageNumber = currentPageNumber(selector);
      if (pageNumber) {
        cachePageNumber(pageNumber);
      }
    });
  };

  const stateHasCache = function () {
    return statesToCache.hasOwnProperty(stateName);
  };

  const getLastSeenPageNumber = function () {
    return cacheHelpers
      .getOrCreateCache(
        CacheFactory,
        statesToCache[stateName]
      ).get('pageNumber');
  };

  const cachePageNumber = function (pageNumber) {
    cacheHelpers.getOrCreateCache(CacheFactory, statesToCache[stateName])
      .put('pageNumber', pageNumber);
  };

  return {
    stateHasCache: stateHasCache,
    cachePageNumber: cachePageNumber,
    getLastSeenPageNumber: getLastSeenPageNumber,
    trackPageNumber: trackPageNumber,
    scrollToPage: scrollToPage,
  };
});
