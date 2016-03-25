const FreeGame = function (API_URL,
                           railsResourceFactory,
                           resourceUrlFormatter) {
  'ngInject';

  const gamesUrl = `${API_URL}/api/v1/free_games`;
  const FreeGame = railsResourceFactory({
    name: 'freeGame',
    url: `${gamesUrl}/{{id}}`,
    fullResponse: true,
  });

  // "Instance-level" properties
  FreeGame.include({
    contentName: 'FreeGame',
    // TODO: real cardImage
    cardImage: 'https://d2izl3afq8akgg.cloudfront.net/' +
               'wp-content/uploads/2013/12/Blueberries-008.jpg',
  });

  // Computed properties
  Object.defineProperty(FreeGame.prototype, 'uiSref', {
    get: function () {
      return resourceUrlFormatter.format('game',
                                         this.slug,
                                         this.pathPillar,
                                         this.pathYear);
    },
  });

  Object.defineProperty(FreeGame.prototype, 'externalUrl', {
    get: function () {
      if (this.gameProvider === 'HN') {
        return this.callToActionUrl;
      } else {
        return `/game-play/${this.slug}`;
      }
    },
  });

  return FreeGame;
};

export default FreeGame ;
