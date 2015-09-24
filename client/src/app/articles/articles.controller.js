var ArticlesController = function (Article) {
  'ngInject';

  Article.query((res) => {
    this.articles = res;
  });
};

export default ArticlesController;
