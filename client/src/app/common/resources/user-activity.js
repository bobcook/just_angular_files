const UserActivity = function (API_URL, railsResourceFactory, railsSerializer) {
  'ngInject';

  return railsResourceFactory({
    name: 'activity',
    url: `${API_URL}/api/v1/me/user_activities/{{id}}`,
    serializer: railsSerializer(function () {
      this.resource('userActivityPeriods', 'UserActivityPeriod');
    }),
  });
};

export default UserActivity;
