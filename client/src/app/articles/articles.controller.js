const ArticlesController = function (Article) {
  'ngInject';

  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = Article;
};

export default ArticlesController;
