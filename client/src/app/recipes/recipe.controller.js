const RecipeController = function (Recipe,
                                   RecipePagePresenter,
                                   RecipeReview,
                                   UserRecipe,
                                   $stateParams,
                                   $location,
                                   restrictedRedirectService,
                                   $redirectContent) {
  'ngInject';

  restrictedRedirectService.filterUnpaidUsers('recipes',
                                              $location.path(),
                                              true);

  const id = $stateParams.id.replace('.html', '');
  Recipe.get(id).then((recipe) => {
    $redirectContent.redirectCheck(recipe);
    this.recipe = recipe.data;
    RecipePagePresenter.forController(this, this.recipe);
  });

  this.isUserNamespace = false;
  this.resource = Recipe;
  this.reviewResource = RecipeReview;
  this.userResource = UserRecipe;
};

export default RecipeController;
