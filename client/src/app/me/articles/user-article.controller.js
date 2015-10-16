const UserArticleController = function (Article,
                                               UserArticle,
                                               ArticleReview,
                                               $state,
                                               $stateParams) {
  'ngInject';

  this.reviews = [];

  // get one article
  UserArticle.get($stateParams.id).then((article) => {
    this.article = article.data;
  });

  // pass values to directive
  this.parentResource = Article;
  this.resource = UserArticle;
  this.reviewResource = ArticleReview;
  this.parentResourceId = $stateParams.id;
};

export default UserArticleController;
