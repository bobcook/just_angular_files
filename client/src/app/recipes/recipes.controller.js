const RecipesController = function (Recipe,
                                    $rootScope,
                                    $state,
                                    $stateParams,
                                    dsoModalService,
                                    restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.showModalToUnpaidUsers('recipes', '/recipes');

  this.resource = Recipe;

};

export default RecipesController;
