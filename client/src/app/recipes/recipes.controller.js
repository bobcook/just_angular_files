const RecipesController = function (Recipe) {
  'ngInject';

  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = Recipe;
};

export default RecipesController;
