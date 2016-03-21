const ArticleController = function (Article,
                                    ArticleReview,
                                    UserArticle,
                                    dsoModalService,
                                    $stateParams) {
  'ngInject';

  const id = $stateParams.id.replace('.html', '');
  // get one article
  Article.get(id).then((article) => {
    this.article = article.data;
  });

  this.openRegisterModal = dsoModalService.showRegisterModal;

  // pass values to directive
  this.isContentDrawerOpen = false;
  this.isUserNamespace = false;
  this.resource = Article;
  this.reviewResource = ArticleReview;
  this.pluralResourceName = 'articles';
  this.userResource = UserArticle;
};

export default ArticleController;
