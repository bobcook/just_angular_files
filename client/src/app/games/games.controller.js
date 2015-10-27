const GamesController = function (Game) {
  'ngInject';

  // pass values to directive
  this.isUserNamespace = false;
  this.resource = Game;
  this.selectedPillar = null; // Will be overwritten by pillar filters
};

export default GamesController;
