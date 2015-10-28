const ArticleModalController = function (Article, $stateParams, $location) {
  'ngInject';

  Article.get($stateParams.id).then((response) => {
    this.article = response.data;
    this.articleTitle = this.article.title;
    this.articleURL = $location.absUrl();
  });
};

export default ArticleModalController;
