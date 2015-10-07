const ReviewsController = function ($stateParams, $rootScope) {
  'ngInject';

  // display all reviews
  this.ReviewResource
  .query({}, { [ `${this.ParentResource.config.name}Id` ]: $stateParams.id })
  .then((reviews) => {
    this.reviews = reviews;
  });

  // review the resource
  this.submitReview = () => {

    new this.ReviewResource({
      [ `${this.ParentResource.config.name}Id` ]: $stateParams.id,
      recommend: this.recommend,
      comment: this.comment,
    })
    .create()
    .then((newReview) => {
      newReview.user = {};
      newReview.user.firstName = $rootScope.$currentUser.firstName;
      newReview.user.lastName = $rootScope.$currentUser.lastName;
      this.reviews.push(newReview);
    });
  };

  // check if user has reviewed the resource
  this.userHasReviewed = () => {
    if (!this.reviews) { return false; }

    return this.reviews.some((review) => {
      return review.user.id === $rootScope.$currentUser.id;
    });
  };

  this.recommendPercentage = () => {
    if (!this.reviews) { return null; }

    const results = this.reviews.filter(function (review) {
      return review.recommend;
    }).length / this.reviews.length;

    return formatPercent(results);
  };

  // TODO: consider moving formatPercent to filter
  const formatPercent = function (decimalNumber) {
    return (Math.round(decimalNumber * 100) || 0) + '%';
  };

};

export default ReviewsController;
