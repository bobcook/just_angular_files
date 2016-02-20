const ExploreContent = function (API_URL,
                                 railsResourceFactory,
                                 railsSerializer) {
  'ngInject';

  const exploreContentURL = `${API_URL}/api/v1/explore_content`;

  const defaults = {
    articles: 2,
    games: 2,
    activities: 3,
    recipes: 2,
  };

  const ExploreContent = railsResourceFactory({
    name: 'exploreContent',
    url: exploreContentURL,
    defaultParams: defaults,
    fullResponse: true,
    serializer: railsSerializer(function () {
      this.resource('activities', 'Activity');
      this.resource('articles', 'Article');
      this.resource('recipes', 'Recipe');
      this.resource('games', 'Game');
    }),
  });

  // "Instance-level" properties
  ExploreContent.include({
    paidGames: function paidGames() {
      return this.games.filter(function (game) {
        return game.gameType.toLowerCase() === 'paid';
      });
    },
    freeGames: function freeGames() {
      return this.games.filter(function (game) {
        return game.gameType.toLowerCase() !== 'paid';
      });
    },
  });

  return ExploreContent;
};

export default ExploreContent;
