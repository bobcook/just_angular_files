const UserActivity = function (API_URL, railsResourceFactory, railsSerializer) {
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
  });

  // "Instance-level" properties
  UserActivity.include({
    contentName: 'Activity',
  });

  // Computed properties
  UserActivity.delete = function (id) {
    return this.$delete(`${userActivityUrl}/${id}`);
  };

  return UserActivity;
};

export default UserActivity;
