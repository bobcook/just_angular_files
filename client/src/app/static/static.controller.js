const StaticController = function ($location,
                                   $anchorScroll) {
  'ngInject';

  $anchorScroll.yOffset = 80;

  this.scrollTo = function (id) {
    $location.hash(id);
    $anchorScroll();
  };

};

export default StaticController;
