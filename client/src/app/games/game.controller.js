const GameController = function (Game,
                                 GameReview,
                                 UserGame,
                                 dsoModalService,
                                 $stateParams,
                                 $state,
                                 $rootScope) {
  'ngInject';

  Game.get($stateParams.id).then((response) => {
    this.game = response.data;

    if (isPaidGame(this.game) && !isPaidUser()) {
      $state.go('application.home', { restrictedRedirect: true });
    };
  });

  const isPaidGame = function (game) {
    return game.gameType === 'Paid';
  };

  const isPaidUser = function () {
    return $rootScope.$currentUser.membershipStatus === 'paid';
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
