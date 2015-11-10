const HomeController = function (ExploreContent) {
  'ngInject';

 // pass values to directive
  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = ExploreContent;
};

export default HomeController;
