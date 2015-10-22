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

  const userArticleUrl = `${API_URL}/api/v1/me/articles`;

  Object.defineProperty(Article.prototype, 'cardImage', {
    // TODO: replace w/ real images
    get: function () {
      return 'http://i.istockimg.com/file_thumbview_approve/23264892/6' +
        '/stock-photo-23264892-elderly-women-gardening.jpg';
    },
  });

  Object.defineProperty(Article.prototype, 'uiSref', {
    get: function () {
      return `application.article({ id: ${this.id} })`;
    },
  });

  return Article;
};

export default Article;
