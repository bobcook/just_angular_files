const runBlock = function ($log,
                           $window,
                           $rootScope,
                           userPolicies,
                           $location,
                           $cookies,
                           $state,
                           dtmAnalyticsService) {
  'ngInject';

  userPolicies.definePermissions();

  const campaignURL = $location.search().campaignURL;
  if (!_.isUndefined(campaignURL)) {
    const options = { expires: new Date(moment().add(14, 'days')) };
    $cookies.put('campaignURL', campaignURL, options);
  }

  //Support for redirectTo in route configuration
  $rootScope.$on('$stateChangeStart', function (event,
                                                toState,
                                                toParams) {
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
    if (fromState.name === 'login-success') {
      $location.search('campaignURL', fromParams.campaignURL);
      $location.search('cmp', fromParams.cmp);
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
