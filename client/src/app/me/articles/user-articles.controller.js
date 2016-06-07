const UserArticlesController = function (UserArticle,
                                         restrictedRedirectService) {
  'ngInject';
  restrictedRedirectService.filterAnonymous('me');

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = UserArticle;
  this.items = null;
  UserArticle.query().then((res) => {
    this.items = res.data;
  });
};

export default UserArticlesController;
