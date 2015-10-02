const ArticlesDetailController = function (Article) {
  'ngInject';

  console.log('ArticlesDetailController');

  Article.get(6).then((article) => {
    this.article = article;
  });
};

export default ArticlesDetailController;
