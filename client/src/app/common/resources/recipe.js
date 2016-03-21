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
  });

  // Computed properties
  Object.defineProperty(Recipe.prototype, 'uiSref', {
    get: function () {
      const query =
        `{id: '${this.slug}', ` +
        `pillar: '${this.pathPillar}', year: '${this.pathYear}'}`;
      return `application.recipe(${query})`;
    },
  });

  return Recipe;
};

export default Recipe;
