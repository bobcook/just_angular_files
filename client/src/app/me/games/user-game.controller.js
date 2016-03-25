const UserGameController = function (Game,
                                     GameReview,
                                     UserGame,
                                     restrictedRedirectService,
                                     $stateParams) {
  'ngInject';

  restrictedRedirectService.filterAnonymous('me');

  // get one game
  UserGame.get($stateParams.id).then((game) => {
    this.game = game.data;

    if (game.gameType === 'Paid') {
      restrictedRedirectService.filterUnpaidUsers('me');
    }
  });

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = Game;
  this.reviewResource = GameReview;
  this.pluralResourceName = 'games';
  this.userResource = UserGame;
};

export default UserGameController;
