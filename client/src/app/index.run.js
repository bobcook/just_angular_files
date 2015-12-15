const runBlock = function ($log, $window, $rootScope, $location) {
  'ngInject';

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams){
    // scroll to top of page
    $window.scrollTo(0, 0);

    // begin of Segment.io analytics
    const path = $location.path();
    const url = $location.url();

    const querystring = (url.indexOf('?') !== -1) ?
      url.substring( url.indexOf('?'), url.length) : '';

    const referrer = fromState.name ?
      `${$location.protocol()}://${$location.host()}/#${fromState.url}` : '';

    analytics.page({
      path: path,
      referrer: referrer,
      search: querystring,
      url: $location.absUrl(),
    });
    // end of Segment.io analytics

  });

  $log.debug('runBlock end');
};

export default runBlock;
