const mastHeadAd = function () {
  return {
    controller: 'MastHeadAdController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/ads/mast-head-ad/mast-head-ad.html',
    restrict: 'E',
    replace: true,
    scope: {},
  };
};

export default mastHeadAd;
