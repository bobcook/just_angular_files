const RecipesController = function (Recipe,
                                    $rootScope,
                                    $state,
                                    $stateParams,
                                    dsoModalService,
                                    restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterUnpaidUsers('recipes', '/recipes');

  this.resource = Recipe;

};

export default RecipesController;
