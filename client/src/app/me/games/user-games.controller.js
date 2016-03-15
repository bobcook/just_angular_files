const UserGamesController = function (UserGame, restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterUnpaidUsers();

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = UserGame;
};

export default UserGamesController;
