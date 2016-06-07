const UserGamesController = function (UserGame, restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterAnonymous('me');

  // pass values to directive
  this.isUserNamespace = true;
  this.resource = UserGame;
  this.items = null;
  UserGame.query().then((res) => {
    this.items = res.data;
  });
};

export default UserGamesController;
