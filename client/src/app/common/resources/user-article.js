const UserArticle = function (API_URL,
                              railsResourceFactory,
                              railsSerializer,
                              Slug) {
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
  });

  // "Instance-level" properties
  UserArticle.include({
    contentName: 'Article',
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
      const slug = Slug.slugify(this.cardTitle);
      return `application.user.article({ id: ${this.id}, slug: '${slug}' })`;
    },
  });

  return UserArticle;
};

export default UserArticle;
