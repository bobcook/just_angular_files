const GameController = function (Game,
                                 GameReview,
                                 UserGame,
                                 dsoModalService,
                                 $stateParams,
                                 $state,
                                 $rootScope,
                                 $location,
                                 restrictedRedirectService,
                                 $redirectContent) {
  'ngInject';

  const id = $stateParams.id.replace('.html', '');
  Game.get(id).then((response) => {
    $redirectContent.redirectCheck(response);
    this.game = response.data;
    this.isPaid = isPaidGame(this.game);
    if (this.isPaid) {
      restrictedRedirectService.filterUnpaidUsers('games',
                                                  $location.path(),
                                                  true);
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
