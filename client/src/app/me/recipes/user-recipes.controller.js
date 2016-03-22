const UserRecipesController = function (UserRecipe, restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterUnpaidUsers('me');

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = UserRecipe;
};

export default UserRecipesController;
