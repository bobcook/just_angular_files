const ActivitiesController = function (Activity,
                                       $stateParams,
                                       restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterUnpaidUsers('activities', '/activities');

  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = Activity;
};

export default ActivitiesController;
