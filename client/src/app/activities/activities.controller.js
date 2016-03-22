const ActivitiesController = function (Activity,
                                       $stateParams,
                                       restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterUnpaidUsers('activities');

  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = Activity;
};

export default ActivitiesController;
