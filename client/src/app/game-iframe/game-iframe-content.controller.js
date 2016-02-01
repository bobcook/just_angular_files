const GameIframeContentController = function ($gamesAuth, $element, $auth) {
  'ngInject';

  $auth.setSessionToken(window.frameElement.getAttribute('data-auth-token'));
  const gameName = window.frameElement.getAttribute('data-game-name');
  $gamesAuth.authenticate(gameName);
};
export default GameIframeContentController;
