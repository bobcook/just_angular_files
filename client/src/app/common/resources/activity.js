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

  return Activity;
};

export default Activity;
