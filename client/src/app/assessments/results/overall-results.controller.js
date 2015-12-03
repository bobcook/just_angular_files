const OverallResultsController = function (Activity) {
  'ngInject';

  // TODO: add real fields for determining recommended content
  this.resource = Activity;
  this.shouldShowMore = false;
  this.resource.query().then((activities) => {
    this.recommendedItems = activities.data;
  });
};

export default OverallResultsController;
