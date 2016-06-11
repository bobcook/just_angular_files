const UserRecipesController = function (UserRecipe, restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.showModalToAnonymousUsers('me');

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = UserRecipe;
  this.items = null;
  UserRecipe.query().then((res) => {
    this.items = res.data;
  });
};

export default UserRecipesController;
