const Activity = function (API_URL,
                           railsResourceFactory,
                           railsSerializer,
                           resourceUrlFormatter) {
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
  });

  // Computed properties
  Object.defineProperty(Activity.prototype, 'uiSref', {
    get: function () {
      return resourceUrlFormatter.format('activity',
                                         this.slug,
                                         this.pathPillar,
                                         this.pathYear);
    },
  });

  Object.defineProperty(Activity.prototype, 'effortText', {
    get: function () {
      return `${this.recommendedEffort}`;
    },
  });

  return Activity;
};

export default Activity;
