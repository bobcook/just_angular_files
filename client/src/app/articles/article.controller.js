const ArticleController = function (Article,
                                    ArticleReview,
                                    UserArticle,
                                    dsoModalService,
                                    $stateParams) {
  'ngInject';

  // get one article
  Article.get($stateParams.id).then((article) => {
    this.article = article.data;
  });

  this.openSubscribeModal = dsoModalService.show;

  // pass values to directive
  this.isContentDrawerOpen = false;
  this.isUserNamespace = false;
  this.resource = Article;
  this.reviewResource = ArticleReview;
  this.pluralResourceName = 'articles';
  this.userResource = UserArticle;
};

export default ArticleController;
