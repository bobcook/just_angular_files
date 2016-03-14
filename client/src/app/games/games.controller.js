const GamesController = function (Game, FreeGame) {
  'ngInject';

  // pass values to directive
  this.isUserNamespace = false;
  this.paidResource = Game;
  this.freeResource = FreeGame;
  this.selectedPillar = null; // Will be overwritten by pillar filters
};

export default GamesController;
