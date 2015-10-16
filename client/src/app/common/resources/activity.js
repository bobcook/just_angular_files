const Activity = function (API_URL, railsResourceFactory, railsSerializer) {
  'ngInject';

  const Activity = railsResourceFactory({
    name: 'activity',
    url: `${API_URL}/api/v1/activities/{{id}}`,
    fullResponse: true,
    pluralName: 'activities',
    serializer: railsSerializer(function () {
      this.resource('pillars', 'Pillar');
    }),
  });

  // "Class-level" properties
  Activity.extend({
    contentName: 'Activity',
  });

  // "Instance-level" properties
  Activity.include({
    contentName: 'Activity',
    // TODO: real cardImage
    cardImage: 'http://media.mlive.com/kzgazette/features_impact/' +
               'photo/women-walking-43fd59f4c24644da_large.jpg',
  });

  // Computed properties
  Object.defineProperty(Activity.prototype, 'uiSref', {
    get: function () {
      return `application.activity({ id: ${this.id} })`;
    },
  });

  Object.defineProperty(Activity.prototype, 'cardImage', {
    // TODO: replace w/ real images
    get: function () {
      return 'http://cache2.asset-cache.net/gc/' +
        '136811175-older-woman-jumping-rope-in-park-gettyimages.jpg?' +
        'v=1&c=IWSAsset&k=2&d=Ca9O%2FgCTOLQ%2F3%2FKMXdtlbb9F9L7wGZ6nTWCbOMin' +
        'Sp1KCUGpYwNm%2FvMw8vbdo8MawzSjPM%2FevZX0iGq9%2FORKKA%3D%3D';
    },
  });

  return Activity;
};

export default Activity;
