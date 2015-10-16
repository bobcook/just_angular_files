const UserRecipesController = function (UserRecipe) {
  'ngInject';

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = UserRecipe;
};

export default UserRecipesController;
