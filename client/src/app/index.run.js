const runBlock = function ($log, $window, $rootScope, $location) {
  'ngInject';

  $rootScope.$on('$stateChangeSuccess', function (event,
                                                  toState,
                                                  toParams,
                                                  fromState,
                                                  fromParams){
    // scroll to top of page
    $window.scrollTo(0, 0);

    // begin of analytics
    const path = $location.path();
    const url = $location.url();

    const querystring = (url.indexOf('?') !== -1) ?
      url.substring(url.indexOf('?'), url.length) : '';

    const referrer = fromState.name ?
      `${$location.protocol()}://${$location.host()}/#${fromState.url}` : '';

    if (window.location.hostname !== 'localhost') {

      // begin of Segment.io analytics
      analytics.page({
        path: path,
        referrer: referrer,
        search: querystring,
        url: $location.absUrl(),
      });

      s.t({ pageName: path });
      // end of Segment.io analytics

      // begin of Adobe DTM analytics
      _satellite.track(url);
      // end of Adobe DTM analytics
    }
  });

  $log.debug('runBlock end');
};

export default runBlock;
