const ArticlesDetailController = function (Article, $state, $stateParams) {
  'ngInject';

  Article.get($stateParams.id).then((article) => {
    this.article = article;
  });

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
