const GameIframeController = function ($auth,
                                       $state,
                                       $location) {
  'ngInject';

  this.game = this.game || null; // via ss-game

  this.iframeSource = function () {
    const currentUrl = $location.absUrl();
    const url =
      $state.href('game-iframe', $state.params, { absolute: true });

    return _.include(currentUrl, 'localhost')
           ? url
           : url.replace('http://', 'https://');
  };

  this.authToken = $auth.sessionToken();
};

export default GameIframeController;
