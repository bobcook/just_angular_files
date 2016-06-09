import { getScreenType, getScreenTypeMinSize, } from
  './common/services/screen-types';
import infiniteScrollHelpers from './common/services/infinite-scroll-helpers';
import advertising from './common/services/advertising';

const runBlock = function ($log,
                           $window,
                           $rootScope,
                           userPolicies,
                           $location,
                           $cookies,
                           $state,
                           dtmAnalyticsService,
                           CacheFactory) {
  'ngInject';

  userPolicies.definePermissions();

  const campaignURL = $location.search().campaignURL;
  if (!_.isUndefined(campaignURL)) {
    const options = { expires: new Date(moment().add(14, 'days')) };
    $cookies.put('campaignURL', campaignURL, options);
  }

  const screenType = getScreenType($window);

  const userSeesAds = function () {
    return !$rootScope.$currentUser || $rootScope.$currentUser.isRegistered();
  };

  $rootScope.userSeesAds = userSeesAds;

  $rootScope.showMobileAd = function () {
    return screenType === 'mobile' && userSeesAds();
  };
  $rootScope.showLargeScreenAd = function () {
    return screenType !== 'mobile' && userSeesAds();
  };

  advertising.defineAdSlots($window);

  $rootScope.$on('$stateChangeStart', function (event,
                                                toState,
                                                toParams) {

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

    const toGames = toState.name === 'application.games';
    const fromGamePlay = fromState.name === 'application.game-play';
    if (toGames && fromGamePlay) {
      const toStateScrollHelper =
        infiniteScrollHelpers(toState.name, CacheFactory);
      $location.hash(toStateScrollHelper.getLastSeenPageNumber());
    }

    advertising.stateSetUp(toParams, toState);

    //NOTE: this can be removed once global params are handled correcty
    // in index.route.js
    if (fromState.name === 'login-success') {
      $location.search('campaignURL', fromParams.campaignURL);
      $location.search('cmp', fromParams.cmp);
      $location.search('promo', fromParams.promo);
    }
    const fromStateScrollHelper =
      infiniteScrollHelpers(fromState.name, CacheFactory);
    if (fromStateScrollHelper.stateWillBeCached()) {
      const pageNumber =
        fromStateScrollHelper.getLastSeenPageNumber();

      // NOTE: we have to handle games differently, probably because of how
      // we get the game from MBS.
      if (pageNumber && toState.name !== 'application.game-play') {
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
