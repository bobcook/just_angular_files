import advertising from '../../common/services/advertising';

const onetimeAd = function ($timeout) {
  'ngInject';
  return {
    restrict: 'E',
    templateUrl: 'app/components/onetime-ad/onetime-ad.html',
    scope: {
      adslot: '@',
    },
    link: function (scope, element) {
      advertising.linkDirective(scope, element, $timeout);
    },
  };
};

export default onetimeAd;
