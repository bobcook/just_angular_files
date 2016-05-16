const ReviewsController = function ($stateParams,
                                    $rootScope,
                                    dsoModalService,
                                    $scope) {
  'ngInject';

  const contentName = this.resource.contentName.toLowerCase();
  let reviews;

  this.showReviews = false;
  this.toggleReviews = () => { this.showReviews = !this.showReviews; };

  // display all reviews
  this.reviewResource
  .query({}, { [ `${contentName}Id` ]: $stateParams.id })
  .then((data) => {
    reviews = data;
  });

  // Css selector for Adobe DTM
  $scope.$watch(() => this.recommend, () => {
    const selector = this.recommend ? 'like' : 'dislike';
    this.dtmSelector = `analytics-rate-${selector}-${contentName}`;
  });

  // review the resource
  this.submitReview = () => {
    new this.reviewResource({
      [ `${contentName}Id` ]: $stateParams.id,
      recommend: this.recommend,
    })
    .create()
    .then((newReview) => {
      newReview.user = {};
      newReview.user.id = $rootScope.$currentUser.id;
      reviews.push(newReview);
    });
  };

  // check if user has reviewed the resource
  this.userHasReviewed = () => {
    if (!reviews || reviews.length === 0) { return false; }
    return reviews.some((review) => {
      return review.user.id === $rootScope.$currentUser.id;
    });
  };

  this.recommendPercentage = () => {
    if (!reviews) { return null; }

    const results = reviews.filter(function (review) {
      return review.recommend;
    }).length / reviews.length;

    return formatPercent(results);
  };

  this.showRegisterModal = dsoModalService.showRegisterModal;

  // TODO: consider moving formatPercent to filter
  const formatPercent = function (decimalNumber) {
    return (Math.round(decimalNumber * 100) || 0) + '%';
  };

};

export default ReviewsController;
