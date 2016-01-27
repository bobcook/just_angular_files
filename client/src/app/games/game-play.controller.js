const GamePlayController = function (Game,
                                     $state,
                                     $stateParams,
                                     previousState,
                                     $auth) {
  'ngInject';

  Game.get($stateParams.id).then((response) => {
    this.game = response.data;
  });

  // NOTE: previousUrl can be '/games', '/me/games', '/games/:id',
  // or '/me/games/:id'
  this.previousUrl = previousState.url || '/games';

  this.iframeSource = $state.get('game-iframe').url;
  this.authToken = $auth.sessionToken();
};

export default GamePlayController;
