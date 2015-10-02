const ArticlesController = function (Article) {
  'ngInject';

  Article.query().then((articles) => {
    this.articles = articles;
  });
};

export default ArticlesController;
