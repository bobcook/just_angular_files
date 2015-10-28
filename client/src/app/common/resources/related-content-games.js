const RelatedContentGames = function (API_URL,
                                      railsResourceFactory,
                                      railsSerializer) {
  'ngInject';

  const relatedContentURL = `${API_URL}/api/v1/related_content`;

  const defaults = {
    games: 5,
  };

  const RelatedContentGames = railsResourceFactory({
    name: 'relatedContent',
    url: relatedContentURL,
    defaultParams: defaults,
    serializer: railsSerializer(function () {
      this.resource('games', 'Game');
    }),
  });

  return RelatedContentGames;
};

export default RelatedContentGames;
