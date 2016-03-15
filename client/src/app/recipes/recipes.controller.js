const RecipesController = function (Recipe,
                                    $rootScope,
                                    $state,
                                    $stateParams,
                                    dsoModalService) {
  'ngInject';

  const guard = () => $stateParams.restrictedRedirect !== 'true';
  dsoModalService.showSubscribeModal('recipes', guard);

  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = Recipe;

};

export default RecipesController;
