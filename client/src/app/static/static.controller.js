const StaticController = function ($location,
                                   $anchorScroll,
                                   $state,
                                   dsoAuth) {
  'ngInject';

  console.log('anchors test >>', $location.path(), $location.hash());

  $anchorScroll.yOffset = 80;

  this.subscribeUrl = dsoAuth.dsoSubscribeAuth($state.href('application.home'));

  this.scrollTo = function (id) {
    $location.hash(id);
    $anchorScroll();
  };

};

export default StaticController;
