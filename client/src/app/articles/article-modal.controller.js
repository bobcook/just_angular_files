const ArticleModalController = function (Article, $stateParams) {
  'ngInject';

  Article.get($stateParams.id).then((article) => {
    this.article = article;
  });
};

export default ArticleModalController;
