const FreeGame = function (API_URL, railsResourceFactory) {
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
      const query =
        `{id: '${this.slug}', ` +
        `pillar: '${this.pathPillar}', year: '${this.pathYear}'}`;
      return `application.game(${query})`;
    },
  });

  return FreeGame;
};

export default FreeGame ;
