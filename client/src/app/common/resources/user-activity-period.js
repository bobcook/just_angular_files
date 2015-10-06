const UserActivityPeriod = function (API_URL,
                                     railsResourceFactory,
                                     railsSerializer) {
  'ngInject';

  const UserActivityPeriod = railsResourceFactory({
    name: 'userActivityPeriod',
    url: `${API_URL}/api/v1/me/user_activity_periods/{{completedDate}}`,
    serializer: railsSerializer(function () {
      this.resource('activityTrackerResponses', 'ActivityTrackerResponse');
      this.only('userActivityId', 'activityTrackerResponses');
    }),
  });

  Object.defineProperty(UserActivityPeriod.prototype, 'date', {
    get: function () {
      return moment(this.completedDate);
    },
  });

  Object.defineProperty(UserActivityPeriod.prototype, 'isTracked', {
    get: function () {
      const responses = this.activityTrackerResponses;
      return _.some(responses, response => response.response > 0);
    },
  });

  return UserActivityPeriod;
};

export default UserActivityPeriod;
