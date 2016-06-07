const UserArchivedActivity = function (API_URL,
                               railsResourceFactory,
                               railsSerializer) {
  'ngInject';

  const userArchivedActivityUrl = `${API_URL}/api/v1/me/archived_activities`;

  const UserArchivedActivity = railsResourceFactory({
    name: 'archivedactivity',
    url: `${userArchivedActivityUrl}/{{id}}`,
    fullResponse: true,
    serializer: railsSerializer(function () {
      this.resource('userActivityPeriods', 'UserActivityPeriod');
    }),
  });

  const getAll = () => {
    return UserArchivedActivity.query().then((res) => {
      const data = res.data && res.data.archivedActivities;
      const rawActivities = data ? _.pluck(data, 'activity') : [];
      return _.map(rawActivities, (activityData) => {
        return new UserArchivedActivity(activityData);
      });
    });
  };

  // "Class-level" properties
  UserArchivedActivity.extend({
    getAll: getAll,
  });

  return UserArchivedActivity;
};

export default UserArchivedActivity;
