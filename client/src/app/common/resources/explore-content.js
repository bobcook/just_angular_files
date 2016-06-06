const ExploreContent = function (API_URL,
                                 railsResourceFactory,
                                 railsSerializer) {
  'ngInject';

  const exploreContentURL = `${API_URL}/api/v1/explore_content`;

  const defaultResourcesPerPage = {
    articles: 2,
    games: 2,
    activities: 3,
    recipes: 2,
    freeGames: 2,
  };

  const ExploreContent = railsResourceFactory({
    name: 'exploreContent',
    url: exploreContentURL,
    defaultParams: defaultResourcesPerPage,
    fullResponse: true,
    serializer: railsSerializer(function () {
      this.resource('activities', 'Activity');
      this.resource('articles', 'Article');
      this.resource('recipes', 'Recipe');
      this.resource('games', 'Game');
      this.resource('freeGames', 'FreeGame');
    }),
  });

  // "Class-level" properties
  ExploreContent.extend({
    contentName: 'ExploreContent',
  });

  // "Instance-level" properties
  ExploreContent.include({
    contentName: 'ExploreContent',
  });

  return ExploreContent;
};

export default ExploreContent;
