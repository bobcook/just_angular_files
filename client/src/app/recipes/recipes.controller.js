const RecipesController = function (Recipe,
                                    $rootScope,
                                    $state,
                                    $stateParams,
                                    dsoModalService,
                                    restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterUnpaidUsers('recipes');

  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = Recipe;

};

export default RecipesController;
