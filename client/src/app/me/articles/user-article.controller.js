const UserArticleController = function (Article,
                                       ArticleReview,
                                       UserArticle,
                                       $stateParams) {
  'ngInject';

  // get one article
  UserArticle.get($stateParams.id).then((article) => {
    this.article = article.data;
  });

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = Article;
  this.reviewResource = ArticleReview;
  this.userResource = UserArticle;
};

export default UserArticleController;
