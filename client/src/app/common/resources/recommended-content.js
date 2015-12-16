const RecommendedContent = function (API_URL,
                                     railsResourceFactory,
                                     Article,
                                     Activity,
                                     railsSerializer) {
  'ngInject';

  const recommendedContentURL = `${API_URL}/api/v1/me/recommended_content`;

  const RecommendedContent = railsResourceFactory({
    name: 'recommendedContent',
    url: recommendedContentURL,
    interceptors: [{
      // convert recommendable object into a resource for card directive
      afterResponse: function (results) {
        const makeRecommendable = function (type, fields) {
          switch (type) {
          case 'Article': return new Article(fields.basicArticle);
          case 'Activity': return new Activity(fields.activity);
          }
        };
        const setRecommendable = function (obj) {
          const recommendable =
            makeRecommendable(obj.recommendableType, obj.recommendable);
          obj.recommendable = recommendable;
          return obj;
        };

        return _.map(results, setRecommendable);
      },
    }],
  });

  return RecommendedContent;
};

export default RecommendedContent;
