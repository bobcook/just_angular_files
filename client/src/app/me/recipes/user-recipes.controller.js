const UserRecipesController = function (UserRecipe, restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterAnonymous('me');

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = UserRecipe;
};

export default UserRecipesController;
