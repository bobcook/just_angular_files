const RecipesController = function (Recipe,
                                    $rootScope,
                                    $state,
                                    restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.check();

  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = Recipe;

};

export default RecipesController;
