const GameController = function (Game,
                                 GameReview,
                                 UserGame,
                                 $stateParams) {
  'ngInject';

  Game.get($stateParams.id).then((response) => {
    this.game = response.data;
  });

  // pass values to directive
  this.isUserNamespace = false;
  this.resource = Game;
  this.reviewResource = GameReview;
  this.pluralResourceName = 'games';
  this.userResource = UserGame;
};

export default GameController;
