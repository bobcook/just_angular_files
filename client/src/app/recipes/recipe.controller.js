const RecipeController = function (Recipe,
                                   RecipePagePresenter,
                                   RecipeReview,
                                   UserRecipe,
                                   $stateParams) {
  'ngInject';

  Recipe.get($stateParams.id).then((recipe) => {
    this.recipe = recipe.data;
    RecipePagePresenter.forController(this, this.recipe);
  });

  this.isUserNamespace = false;
  this.resource = Recipe;
  this.reviewResource = RecipeReview;
  this.userResource = UserRecipe;
};

export default RecipeController;
