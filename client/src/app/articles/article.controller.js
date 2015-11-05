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
  this.isContentDrawerOpen = false;
  this.isUserNamespace = false;
  this.resource = Article;
  this.reviewResource = ArticleReview;
  this.pluralResourceName = 'articles';
  this.userResource = UserArticle;
};

export default ArticleController;
