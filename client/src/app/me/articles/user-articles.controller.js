const UserArticlesController = function (UserArticle) {
  'ngInject';

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = UserArticle;
};

export default UserArticlesController;
