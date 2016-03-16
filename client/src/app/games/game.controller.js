const GameController = function (Game,
                                 GameReview,
                                 UserGame,
                                 dsoModalService,
                                 $stateParams,
                                 $state,
                                 $rootScope,
                                 restrictedRedirectService) {
  'ngInject';

  Game.get($stateParams.id).then((response) => {
    this.game = response.data;

    if (isPaidGame(this.game)) {
      restrictedRedirectService.filterUnpaidUsers('application.games');
    };
  });

  const isPaidGame = function (game) {
    return game.gameType === 'Paid';
  };

  this.openRegisterModal = dsoModalService.showRegisterModal;

  // pass values to directive
  this.isUserNamespace = false;
  this.resource = Game;
  this.reviewResource = GameReview;
  this.pluralResourceName = 'games';
  this.userResource = UserGame;
};

export default GameController;
