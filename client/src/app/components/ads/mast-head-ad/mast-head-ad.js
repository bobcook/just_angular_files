import advertising from '../../../common/services/advertising';

const mastHeadAd = function ($timeout) {
  'ngInject';
  return {
    templateUrl: 'app/components/ads/mast-head-ad/mast-head-ad.html',
    restrict: 'E',
    replace: true,
    scope: {
      adslot: '@',
    },
    link: function (scope, element) {
      advertising.linkDirective(scope, element, $timeout);
      if (scope.$root.userSeesAds()) {
        scope.$root.$on('$stateChangeSuccess', function () {
          googletag.cmd.push(function () {
            googletag.pubads()
              .refresh([advertising.adSlotsByID[scope.adslot]]);
          });
        });
      }
    },
  };
};

export default mastHeadAd;
