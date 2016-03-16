const GamesController = function (Game,
                                  FreeGame,
                                  dsoModalService,
                                  $stateParams) {
  'ngInject';

  const guard = () => $stateParams.restrictedRedirect !== 'true';
  dsoModalService.showSubscribeModal('games', guard);

  // pass values to directive
  this.isUserNamespace = false;
  this.paidResource = Game;
  this.freeResource = FreeGame;
  this.selectedPillar = null; // Will be overwritten by pillar filters
};

export default GamesController;
