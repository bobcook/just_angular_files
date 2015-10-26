const ArticleModalController = function (Article, $stateParams) {
  'ngInject';

  Article.get($stateParams.id).then((response) => {
    this.article = response.data;
    this.articleTitle = this.article.title;
    this.articleURL = this.article.$url();
  });
};

export default ArticleModalController;
