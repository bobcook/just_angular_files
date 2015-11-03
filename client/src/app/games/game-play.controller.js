const GamePlayController = function (Game,
                                     $stateParams,
                                     previousState) {
  'ngInject';

  Game.get($stateParams.id).then((response) => {
    this.game = response.data;
  });

  // NOTE: previousUrl can be '/games', '/me/games', '/game/:id',
  // or '/me/game/:id'
  this.previousUrl = previousState.url || '/games';
};

export default GamePlayController;
