import advertising from '../../../common/services/advertising';

const stateShouldHaveAds = (appStatePathname) => {
  return !(
    appStatePathname === '/assessments' ||
    appStatePathname === '/what-is-staying-sharp' ||
    appStatePathname.includes('/me/')
  );
};

const mastHeadAd = function ($timeout, $location) {
  'ngInject';
  return {
    templateUrl: 'app/components/ads/mast-head-ad/mast-head-ad.html',
    restrict: 'E',
    replace: true,
    scope: {
      adslot: '@',
    },
    link: function (scope, element, attr) {
      if (stateShouldHaveAds($location.path())) {
        element.show();
        advertising.linkDirective(scope, element, $timeout);
      } else {
        element.hide();
      }
      if (scope.$root.userSeesAds()) {
        scope.$root.$on('$stateChangeSuccess', function (event, toState) {
          if (stateShouldHaveAds($location.path())) {
            element.show();
            googletag.cmd.push(function () {
              googletag.pubads()
              .refresh([advertising.adSlotsByID[scope.adslot]]);
            });
          } else {
            element.hide();
          }
        });
      }
    },
  };
};

export default mastHeadAd;
