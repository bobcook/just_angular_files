const UserArticlesController = function (UserArticle, Article) {
  'ngInject';

  UserArticle.query().then((userArticles) => {
    this.articles = userArticles.articles;
  });

  // pass values to directive
  this.parentResource = Article;
  this.resource = UserArticle;
};

export default UserArticlesController;
