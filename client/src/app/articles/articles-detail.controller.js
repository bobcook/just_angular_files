const ArticlesDetailController = function (Article, $state, $stateParams) {
  'ngInject';

  // show one article
  Article.get($stateParams.id).then((article) => {
    this.article = article;
  });

  // save article
  this.articleIsSaved = false;

  Article.queryUserArticle($stateParams.id).then((article) => {
    if (article.id) {
      this.articleIsSaved = true;
    }
  });

  // TODO: disable save button when article is saved
  this.saveArticle = () => {
    if (!this.articleIsSaved) {
      this.article.saveUserArticle().then(() => {
        $state.go('.article-saved');
      });
    }
  };
};

export default ArticlesDetailController;
