const UserRecipeController = function (Recipe,
                                       RecipePagePresenter,
                                       RecipeReview,
                                       UserRecipe,
                                       restrictedRedirectService,
                                       $stateParams) {
  'ngInject';

  restrictedRedirectService.filterUnpaidUsers('me');

  // get one recipe
  UserRecipe.get($stateParams.id).then((recipe) => {
    this.recipe = recipe.data;
    RecipePagePresenter.forController(this, this.recipe);
  });

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = Recipe;
  this.reviewResource = RecipeReview;
  this.userResource = UserRecipe;
};

export default UserRecipeController;
