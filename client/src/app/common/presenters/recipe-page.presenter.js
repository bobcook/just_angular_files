const RecipePagePresenter = function (DefaultShowPagePresenter,
                                      $filter,
                                      $presenterUtils) {
  'ngInject';

  const Default = DefaultShowPagePresenter;

  const overrideFields = function (recipe) {
    const MAX_TITLE_LENGTH = 80;
    const timeText = `Preparation time: ${recipe.duration}`;

    return {
      body1: recipe.section1Body,
      benefitsToBrainHealth: recipe.benefitsToBrainHealth,
      content: {
        'Ingredients': recipe.ingredients,
        'Instructions': recipe.instructions,
      },
      contentTitle: 'How to Make This:',
      contentSubtitle: timeText,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      lowerLeft: timeText,
      sourceMaterialsCitation: recipe.sourceMaterialsCitation,
    };
  };

  return {
    // forController :: Controller -> Resource -> ModifiedResource
    forController:
      $presenterUtils.withFieldsFrom(Default.defaultFields, overrideFields),
  };
};

export default RecipePagePresenter;
