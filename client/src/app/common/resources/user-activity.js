const UserActivity = function (API_URL, railsResourceFactory, railsSerializer) {
  'ngInject';

  const UserActivity = railsResourceFactory({
    name: 'activity',
    url: `${API_URL}/api/v1/me/user_activities/{{id}}`,
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

  return UserActivity;
};

export default UserActivity;
