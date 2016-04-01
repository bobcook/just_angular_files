const StaticController = function ($location,
                                   $anchorScroll,
                                   $state,
                                   dsoAuth) {
  'ngInject';

  $anchorScroll.yOffset = 80;

  this.subscribeUrl = dsoAuth.dsoSubscribeAuth($state.href('application.home'));

  this.whatIsSubscribeUrl = dsoAuth.dsoSubscribeAuth(
    $state.href('application.home'),
    'SSS-JOINSS-LP-WHATIS'
  );

  this.scrollTo = function (id) {
    $location.hash(id);
    $anchorScroll();
  };
};

export default StaticController;
