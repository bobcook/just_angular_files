const ArticlesController = function (Article) {
  'ngInject';

  // pass values to directive
  this.isUserNamespace = false;
  this.resource = Article;
  this.selectedPillar = null; // Will be overwritten by pillar filters
};

export default ArticlesController;
