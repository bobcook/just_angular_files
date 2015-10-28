const UserGamesController = function (UserGame) {
  'ngInject';

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = UserGame;
};

export default UserGamesController;
