const Game = function (API_URL,
                       railsResourceFactory,
                       railsSerializer,
                       resourceUrlFormatter) {
  'ngInject';

  const gamesUrl = `${API_URL}/api/v1/games`;
  const Game = railsResourceFactory({
    name: 'game',
    url: `${gamesUrl}/{{id}}`,
    fullResponse: true,
    serializer: railsSerializer(function () {
      this.resource('pillars', 'Pillar');
    }),
  });

  // "Class-level" properties
  Game.extend({
    contentName: 'Game',
  });

  // "Instance-level" properties
  Game.include({
    contentName: 'Game',
    // TODO: real cardImage
    cardImage: 'https://d2izl3afq8akgg.cloudfront.net/' +
               'wp-content/uploads/2013/12/Blueberries-008.jpg',
  });

  // Computed properties
  Object.defineProperty(Game.prototype, 'uiSref', {
    get: function () {
      return resourceUrlFormatter.format('game',
                                         this.slug,
                                         this.pathPillar,
                                         this.pathYear);
    },
  });

  Object.defineProperty(Game.prototype, 'externalUrl', {
    get: function () {
      if (this.gameProvider === 'HN') {
        return this.callToActionUrl;
      } else {
        return `/game-play/${this.slug}`;
      }
    },
  });

  return Game;
};

export default Game;
