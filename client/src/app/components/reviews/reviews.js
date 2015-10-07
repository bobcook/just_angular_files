const reviews = function () {
  return {
    controller: 'ReviewsController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/reviews/reviews.html',
    restrict: 'E',
    scope: {
      ReviewResource: '=resourceReview',
      ParentResource: '=parentResource',
    },
    transclude: true,
  };
};

export default reviews;
