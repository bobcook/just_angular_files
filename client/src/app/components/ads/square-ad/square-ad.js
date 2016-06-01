import advertising from '../../../common/services/advertising';

const squareAd = function ($timeout) {
  'ngInject';
  return {
    templateUrl: 'app/components/ads/square-ad/square-ad.html',
    restrict: 'E',
    replace: false,
    scope: {
      adslot: '@',
    },
    link: function (scope, element) {
      advertising.linkDirective(scope, element, $timeout);
    },
  };
};

export default squareAd;
