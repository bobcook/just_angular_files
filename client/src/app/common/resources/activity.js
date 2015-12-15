const Activity = function (API_URL,
                           railsResourceFactory,
                           railsSerializer,
                           Slug) {
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
      const slug = Slug.slugify(this.cardTitle);
      return `application.activity({ id: ${this.id}, slug: '${slug}' })`;
    },
  });

  Object.defineProperty(Activity.prototype, 'effortText', {
    get: function () {
      return `${this.recommendedEffortFrequency}`;
    },
  });

  return Activity;
};

export default Activity;
