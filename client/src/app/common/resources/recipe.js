const Recipe = function (API_URL, railsResourceFactory, railsSerializer, Slug) {
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
      const slug = Slug.slugify(this.cardTitle);
      return `application.recipe({ id: ${this.id}, slug: '${slug}' })`;
    },
  });

  return Recipe;
};

export default Recipe;
