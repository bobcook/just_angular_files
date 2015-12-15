const UserGame = function (API_URL,
                           railsResourceFactory,
                           railsSerializer,
                           Slug) {
  'ngInject';

  const userGameUrl = `${API_URL}/api/v1/me/games`;

  const UserGame = railsResourceFactory({
    name: 'game',
    url: `${userGameUrl}/{{id}}`,
    fullResponse: true,
    serializer: railsSerializer(function () {
      this.resource('pillars', 'Pillar');
    }),
  });

  // "Class-level" properties
  UserGame.extend({
    contentName: 'Game',
  });

  // "Instance-level" properties
  UserGame.include({
    contentName: 'Game',
    // TODO: real cardImage
    cardImage: '//i.istockimg.com/file_thumbview_approve/23264892/6' +
                '/stock-photo-23264892-elderly-women-gardening.jpg',
  });

  // Computed properties
  UserGame.delete = function (id) {
    return this.$delete(`${userGameUrl}/${id}`);
  };

  Object.defineProperty(UserGame.prototype, 'uiSref', {
    get: function () {
      const slug = Slug.slugify(this.cardTitle);
      return `application.user.game({ id: ${this.id}, slug: '${slug}' })`;
    },
  });

  Object.defineProperty(UserGame.prototype, 'externalUrl', {
    get: function () {
      return this.callToActionUrl;
    },
  });

  return UserGame;
};

export default UserGame;
