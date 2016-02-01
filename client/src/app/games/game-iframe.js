const gameIframe = function () {
  return {
    controller: 'GameIframeController',
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'E',
    replace: true,
    templateUrl: 'app/games/game-iframe.html',
    scope: {
      game: '=ssGame',
    },
    link: function (scope, element, attrs) {
      const iframeHeight = $(element).height();

      // This may not have any effect since MBS game takes over the
      // iframe after this
      element.bind('load', function (event) {
        event.target.contentWindow.scrollTo(0, iframeHeight / 2);
      });
    },
  };
};

export default gameIframe;
