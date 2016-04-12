const GameModalController = function (Game,
                                      $currentModal,
                                      $location,
                                      $stateParams) {
  'ngInject';

  Game.get($stateParams.id).then((response) => {
    this.resource = response.data;
    this.resourceTitle = this.resource.title;
    this.resourceURL = $location.absUrl();
  });

  this.closeModal = $currentModal.close;
  this.resourceName = 'game';
  this.pluralResourceName = `${this.resourceName}s`;
  this.explorePath = `application.${this.pluralResourceName}`;
  this.stayingSharpPath = `application.user.${this.pluralResourceName}`;
};

export default GameModalController;
