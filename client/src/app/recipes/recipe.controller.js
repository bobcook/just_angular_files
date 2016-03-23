const RecipeController = function (Recipe,
                                   RecipePagePresenter,
                                   RecipeReview,
                                   UserRecipe,
                                   $stateParams,
                                   $location,
                                   restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterUnpaidUsers('recipes', $location.path());

  const id = $stateParams.id.replace('.html', '');
  Recipe.get(id).then((recipe) => {
    this.recipe = recipe.data;
    RecipePagePresenter.forController(this, this.recipe);
  });

  this.isUserNamespace = false;
  this.resource = Recipe;
  this.reviewResource = RecipeReview;
  this.userResource = UserRecipe;
};

export default RecipeController;
