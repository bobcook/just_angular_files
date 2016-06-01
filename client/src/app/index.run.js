import advertising from './common/services/advertising';
import { getScreenType } from './common/services/screen-types';
import infiniteScrollHelpers from './common/services/infinite-scroll-helpers';

const runBlock = function ($log,
                           $window,
                           $rootScope,
                           userPolicies,
                           $location,
                           $cookies,
                           $state,
                           dtmAnalyticsService,
                           DoubleClick,
                           CacheFactory) {
  'ngInject';

  userPolicies.definePermissions();

  const campaignURL = $location.search().campaignURL;
  if (!_.isUndefined(campaignURL)) {
    const options = { expires: new Date(moment().add(14, 'days')) };
    $cookies.put('campaignURL', campaignURL, options);
  }

  const userSeesAds = function () {
    return !$rootScope.$currentUser || $rootScope.$currentUser.isRegistered();
  };
  $rootScope.userSeesAds = userSeesAds;
  $rootScope.showMobileAd = function () {
    return getScreenType($window) === 'mobile' && userSeesAds();
  };
  $rootScope.showLargeScreenAd = function () {
    return getScreenType($window) !== 'mobile' && userSeesAds();
  };

  $rootScope.$on('$stateChangeStart', function (event,
                                                toState,
                                                toParams) {
    const params = $location.search();

    advertising.stateSetUp(DoubleClick, params, toState);

    //Support for redirectTo in route configuration
    if (toState.redirectTo) {
      event.preventDefault();
      $state.go(toState.redirectTo, toParams, { location: 'replace' });
    }
  });

  $rootScope.$on('$stateChangeSuccess', function (event,
                                                  toState,
                                                  toParams,
                                                  fromState,
                                                  fromParams) {
    const infiniteScroll = infiniteScrollHelpers(fromState.name, CacheFactory);

    if (fromState.name === 'login-success') {
      $location.search('campaignURL', fromParams.campaignURL);
      $location.search('cmp', fromParams.cmp);
      $location.search('promo', fromParams.promo);
    }

    if (infiniteScroll.stateHasCache()) {
      const pageNumber =
        infiniteScroll.getLastSeenPageNumber();

      if (pageNumber) {
        const url = `${$state.href(fromState)}#${pageNumber}`;
        window.history.replaceState({}, '', url);
      }
    }

    // scroll to top of page
    $window.scrollTo(0, 0);

    //reset metadata on state change
    $window.document.title = '';
    $('meta[name="description"]').attr('content', '');
    $('meta[name="keywords"]').attr('content', '');
    $('meta[name="robots"]').attr('content', '');
    $('link[rel="canonical"]').attr('href', '');

    // begin of analytics
    const path = $location.path();
    const url = $location.url();

    const querystring = (url.indexOf('?') !== -1) ?
      url.substring(url.indexOf('?'), url.length) : '';

    const referrer = fromState.name ?
      `${$location.protocol()}://${$location.host()}/#${fromState.url}` : '';

    $window.dtmDataLayer = dtmAnalyticsService.getDataLayer();
    _satellite.track('ss_virtual_page');

    if (window.location.hostname !== 'localhost') {

      // begin of Segment.io analytics
      analytics.page({
        path: path,
        referrer: referrer,
        search: querystring,
        url: $location.absUrl(),
      });
      // end of Segment.io analytics
    }
  });

  $log.debug('runBlock end');
};

export default runBlock;
