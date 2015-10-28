const ArticleController = function (Article,
                                    ArticleReview,
                                    UserArticle,
                                    $stateParams) {
  'ngInject';

  // get one article
  Article.get($stateParams.id).then((article) => {
    this.article = article.data;
  });

  // pass values to directive
  this.isUserNamespace = false;
  this.resource = Article;
  this.reviewResource = ArticleReview;
  this.userResource = UserArticle;
  this.isContentDrawerOpen = false;
};

export default ArticleController;
