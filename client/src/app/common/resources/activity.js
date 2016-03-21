const Activity = function (API_URL,
                           railsResourceFactory,
                           railsSerializer) {
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
      const query =
        `{id: '${this.slug}', ` +
        `pillar: '${this.pathPillar}', year: '${this.pathYear}'}`;
      return `application.activity(${query})`;
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
