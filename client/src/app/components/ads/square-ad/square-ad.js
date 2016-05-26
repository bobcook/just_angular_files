const squareAd = function () {
  return {
    templateUrl: 'app/components/ads/square-ad/square-ad.html',
    restrict: 'E',
    replace: false,
    scope: {
      adSlot: '@adSlot',
    },
  };
};

export default squareAd;
