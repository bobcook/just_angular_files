const Recipe = function (API_URL, railsResourceFactory, railsSerializer) {
  'ngInject';

  const recipesURL = `${API_URL}/api/v1/recipes`;

  const Recipe = railsResourceFactory({
    name: 'recipe',
    url: `${recipesURL}/{{id}}`,
    fullResponse: true,
    serializer: railsSerializer(function () {
      this.resource('pillars', 'Pillar');
    }),
  });

  // "Class-level" properties
  Recipe.extend({
    contentName: 'Recipe',
  });

  // "Instance-level" properties
  Recipe.include({
    contentName: 'Recipe',
    // TODO: real cardImage
    cardImage: 'https://d2izl3afq8akgg.cloudfront.net/' +
               'wp-content/uploads/2013/12/Blueberries-008.jpg',
  });

  // Computed properties
  Object.defineProperty(Recipe.prototype, 'uiSref', {
    get: function () {
      return `application.recipe({ id: ${this.id} })`;
    },
  });

  return Recipe;
};

export default Recipe;
