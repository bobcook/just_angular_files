const UserGameController = function (Game,
                                     GameReview,
                                     UserGame,
                                     $stateParams) {
  'ngInject';

  // get one game
  UserGame.get($stateParams.id).then((game) => {
    this.game = game.data;
  });

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = Game;
  this.reviewResource = GameReview;
  this.pluralResourceName = 'games';
  this.userResource = UserGame;
};

export default UserGameController;