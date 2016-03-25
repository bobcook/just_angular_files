const UserArticle = function (API_URL,
                              railsResourceFactory,
                              railsSerializer,
                              resourceUrlFormatter) {
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

  // "Class-level" properties
  UserArticle.extend({
    contentName: 'Article',
    pluralContentName: 'Articles',
  });

  // "Instance-level" properties
  UserArticle.include({
    contentName: 'Article',
    pluralContentName: 'Articles',
    // TODO: real cardImage
    cardImage: '//i.istockimg.com/file_thumbview_approve/23264892/6' +
                '/stock-photo-23264892-elderly-women-gardening.jpg',
  });

  // Computed properties
  UserArticle.delete = function (id) {
    return this.$delete(`${userArticleUrl}/${id}`);
  };

  Object.defineProperty(UserArticle.prototype, 'uiSref', {
    get: function () {
      return resourceUrlFormatter.format('article',
                                         this.slug,
                                         this.pathPillar,
                                         this.pathYear);
    },
  });

  return UserArticle;
};

export default UserArticle;
