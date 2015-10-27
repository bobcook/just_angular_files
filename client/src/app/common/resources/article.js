const Article = function (API_URL, railsResourceFactory, railsSerializer) {
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
    // TODO: real cardImage
    cardImage: 'http://i.istockimg.com/file_thumbview_approve/23264892/6' +
                '/stock-photo-23264892-elderly-women-gardening.jpg',
  });

  // Computed properties
  Object.defineProperty(Article.prototype, 'uiSref', {
    get: function () {
      return `application.article({ id: ${this.id} })`;
    },
  });

  return Article;
};

export default Article;
