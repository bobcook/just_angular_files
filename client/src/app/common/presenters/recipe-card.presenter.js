const RecipeCardPresenter = function (DefaultCardPresenter) {
  'ngInject';

  const Default = DefaultCardPresenter;

  const fieldOverrides = function (controller, recipe) {
    return {
      cardContent: '',
      cardClasses: controller.cardClasses || 'recipe-card',
      lowerLeft: `Cook/prep: ${recipe.duration}`,
    };
  };

  return {
    forController: function (controller, recipe) {
      const overrides = fieldOverrides(controller, recipe);
      return Default.forController(controller, recipe, overrides);
    },
  };
};

export default RecipeCardPresenter;
