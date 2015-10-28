// TODO: consider generalizing the controller logic for modals
const GameModalController = function (Game, $stateParams, $location) {
  'ngInject';

  Game.get($stateParams.id).then((response) => {
    this.game = response.data;
    this.gameTitle = this.game.title;
    this.gameURL = $location.absUrl();
  });
};

export default GameModalController;
