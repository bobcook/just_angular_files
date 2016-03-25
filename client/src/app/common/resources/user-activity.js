const UserActivity = function (API_URL,
                               railsResourceFactory,
                               railsSerializer,
                               resourceUrlFormatter) {
  'ngInject';

  // TODO: what's api/v1/me/user_activities for???
  const userActivityUrl = `${API_URL}/api/v1/me/activities`;

  const UserActivity = railsResourceFactory({
    name: 'activity',
    url: `${userActivityUrl}/{{id}}`,
    fullResponse: true,
    serializer: railsSerializer(function () {
      this.resource('userActivityPeriods', 'UserActivityPeriod');
    }),
  });

  // "Class-level" properties
  UserActivity.extend({
    contentName: 'Activity',
    pluralContentName: 'Activities',
  });

  // "Instance-level" properties
  UserActivity.include({
    contentName: 'Activity',
    pluralContentName: 'Activities',
  });

  // Computed properties
  UserActivity.delete = function (id) {
    return this.$delete(`${userActivityUrl}/${id}`);
  };

  Object.defineProperty(UserActivity.prototype, 'uiSref', {
    get: function () {
      return resourceUrlFormatter.format('activity',
                                         this.slug,
                                         this.pathPillar,
                                         this.pathYear);
    },
  });

  // TODO: refactor commonality w/ this and activity.js
  Object.defineProperty(UserActivity.prototype, 'effortText', {
    get: function () {
      return `Effort: ${this.recommendedEffort}`;
    },
  });

  return UserActivity;
};

export default UserActivity;
