const ActivitiesController = function (Activity) {
  'ngInject';

  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = Activity;
};

export default ActivitiesController;
