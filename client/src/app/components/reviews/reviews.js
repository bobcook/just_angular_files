const reviews = function () {
  return {
    controller: 'ReviewsController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/reviews/reviews.html',
    restrict: 'E',
    scope: {
      reviewResource: '=ssReviewResource',
      resource: '=ssResource',
    },
    transclude: true,
  };
};

export default reviews;
