const ArticleController = function (Article,
                                           ArticleReview,
                                           $state,
                                           $stateParams) {
  'ngInject';

  this.reviews = [];

  // get one article
  Article.get($stateParams.id).then((article) => {
    this.article = article.data;
  });

  // save article
  this.articleIsSaved = false;

  this.saveArticle = () => {
    if (!this.articleIsSaved) {
      this.article.saveUserArticle().then(() => {
        $state.go('.article-saved');
      });
    }
  };

  // check if user has saved the article
  Article.queryUserArticle($stateParams.id).then((article) => {
    if (article.id) {
      this.articleIsSaved = true;
    }
  });

  // pass values to directive
  this.reviewResource = ArticleReview;
  this.parentResource = Article;

};

export default ArticleController;
