const GamePlayController = function (Game,
                                     $stateParams,
                                     $featureDetection,
                                     previousState) {
  'ngInject';

  this.hasFlash = $featureDetection.hasFlash();

  Game.get($stateParams.id).then((response) => {
    this.game = response.data;
  });

  // NOTE: previousUrl can be '/games', '/me/games', '/games/:id',
  // or '/me/games/:id'
  this.previousUrl = previousState.url || '/games';
};

export default GamePlayController;
