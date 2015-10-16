const UserArticle = function (API_URL, railsResourceFactory, railsSerializer) {
  'ngInject';

  const userArticleUrl = `${API_URL}/api/v1/me/articles`;

  const UserArticle = railsResourceFactory({
    name: 'article',
    url: `${userArticleUrl}/{{id}}`,
    fullResponse: true,
    serializer: railsSerializer(function () {
      this.resource('pillars', 'Pillar');
    }),
  });

  UserArticle.delete = function (id) {
    return this.$delete(`${userArticleUrl}/${id}`);
  };

  Object.defineProperty(UserArticle.prototype, 'cardImage', {
    // TODO: replace w/ real images
    get: function () {
      return 'http://i.istockimg.com/file_thumbview_approve/23264892/6' +
        '/stock-photo-23264892-elderly-women-gardening.jpg';
    },
  });

  Object.defineProperty(UserArticle.prototype, 'uiSref', {
    get: function () {
      return `application.user.article({ id: ${this.id} })`;
    },
  });

  return UserArticle;
};

export default UserArticle;
