const ArticleSavedController = function (Article, $stateParams) {
  Article.get($stateParams.id).then((article) => {
    this.article = article;
  });
};

export default ArticleSavedController;
