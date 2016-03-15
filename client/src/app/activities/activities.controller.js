const ActivitiesController = function (Activity,
                                       $stateParams,
                                       dsoModalService) {
  'ngInject';

  const guard = () => $stateParams.restrictedRedirect !== 'true';
  dsoModalService.showSubscribeModal('activities', guard);

  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = Activity;
};

export default ActivitiesController;
