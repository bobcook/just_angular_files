const RecipePagePresenter = function ($filter) {
  'ngInject';

  const presentableFields = function (recipe) {
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
      mastHeadImage: recipe.mastHeadImage,
      pillars: recipe.pillars,
      sourceMaterialsCitation: recipe.sourceMaterialsCitation,
      topLeft: _.capitalize(recipe.constructor.config.name),
      title: $filter('limitTo')(recipe.mastHeadTitle, MAX_TITLE_LENGTH),
    };
  };

  return {
    forController: function (controller, recipe) {
      _.each(presentableFields(recipe), function (v, k) {
        controller[k] = v;
      });
    },
  };
};

export default RecipePagePresenter;
