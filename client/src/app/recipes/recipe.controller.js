const RecipeController = function (Recipe, $stateParams) {
  'ngInject';

  Recipe.get($stateParams.id).then((response) => {
    this.recipe = response.data;
  });
};

export default RecipeController;
