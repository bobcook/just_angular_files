const RelatedContent = function (API_URL,
                                 railsResourceFactory,
                                 railsSerializer) {
  'ngInject';

  const relatedContentURL = `${API_URL}/api/v1/related_content`;

  const defaults = {
    activities: 5,
    articles: 8,
  };

  const RelatedContent = railsResourceFactory({
    name: 'relatedContent',
    url: relatedContentURL,
    defaultParams: defaults,
    serializer: railsSerializer(function () {
      this.resource('activities', 'Activity');
      this.resource('articles', 'Article');
      this.resource('recipes', 'Recipe');
    }),
  });

  return RelatedContent;
};

export default RelatedContent;
