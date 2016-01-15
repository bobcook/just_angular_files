const UserRecipe = function (API_URL,
                             railsResourceFactory,
                             railsSerializer) {
  'ngInject';

  const userRecipeUrl = `${API_URL}/api/v1/me/recipes`;

  const UserRecipe = railsResourceFactory({
    name: 'recipe',
    url: `${userRecipeUrl}/{{id}}`,
    fullResponse: true,
    serializer: railsSerializer(function () {
      this.resource('pillars', 'Pillar');
    }),
  });

  // "Class-level" properties
  UserRecipe.extend({
    contentName: 'Recipe',
    pluralContentName: 'Recipes',
  });

  // "Instance-level" properties
  UserRecipe.include({
    contentName: 'Recipe',
    pluralContentName: 'Recipes',
    // TODO: real cardImage
    cardImage: 'https://d2izl3afq8akgg.cloudfront.net/' +
               'wp-content/uploads/2013/12/Blueberries-008.jpg',
  });

  // Computed properties
  UserRecipe.delete = function (id) {
    return this.$delete(`${userRecipeUrl}/${id}`);
  };

  Object.defineProperty(UserRecipe.prototype, 'uiSref', {
    get: function () {
      return `application.user.recipe({ id: '${this.slug}' })`;
    },
  });

  return UserRecipe;
};

export default UserRecipe;
