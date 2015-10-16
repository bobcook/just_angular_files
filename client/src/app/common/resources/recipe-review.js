const RecipeReview = function ($stateParams, API_URL, railsResourceFactory) {
  'ngInject';

  const RecipeReview = railsResourceFactory({
    name: 'review',
    url: `${API_URL}/api/v1/recipes/{{recipeId}}/reviews`,
  });

  // "Class-level" properties
  RecipeReview.extend({
    contentName: 'Review',
  });

  // "Instance-level" properties
  RecipeReview.include({
    contentName: 'Review',
  });

  return RecipeReview;
};

export default RecipeReview;
