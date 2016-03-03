const UserArticlesController = function (UserArticle,
                                         restrictedRedirectService) {
  'ngInject';
  restrictedRedirectService.check();

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = UserArticle;
};

export default UserArticlesController;
