const Article = function (API_URL,
                          railsResourceFactory,
                          railsSerializer,
                          resourceUrlFormatter) {
  'ngInject';

  const Article = railsResourceFactory({
    name: 'article',
    url: `${API_URL}/api/v1/articles/{{id}}`,
    fullResponse: true,
    serializer: railsSerializer(function () {
      this.resource('pillars', 'Pillar');
    }),
  });

  // "Class-level" properties
  Article.extend({
    contentName: 'Article',
  });

  // "Instance-level" properties
  Article.include({
    contentName: 'Article',
  });

  // Computed properties
  Object.defineProperty(Article.prototype, 'uiSref', {
    get: function () {
      return resourceUrlFormatter.format('article',
                                         this.slug,
                                         this.pathPillar,
                                         this.pathYear);
    },
  });

  return Article;
};

export default Article;
