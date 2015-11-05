const RecipeCardPresenter = function ($presenterUtils,
                                      DefaultCardPresenter) {
  'ngInject';

  const Default = DefaultCardPresenter;

  const overrideFields = function (recipe, controller) {
    return {
      cardContent: '',
      cardClasses: controller.cardClasses || 'recipe-card',
      lowerLeft: `Cook/prep: ${recipe.duration}`,
    };
  };

  return {
    // forController :: Controller -> Resource -> MutatedController
    forController:
      $presenterUtils.withFieldsFrom(Default.defaultFields, overrideFields),
  };
};

export default RecipeCardPresenter;
