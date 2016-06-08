const UserArchivedActivity = function (API_URL,
                               railsResourceFactory,
                               railsSerializer,
                               resourceUrlFormatter) {
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

  // Computed properties
  Object.defineProperty(UserArchivedActivity.prototype, 'uiSref', {
    get: function () {
      return resourceUrlFormatter.format('activity',
                                         this.slug,
                                         this.pathPillar,
                                         this.pathYear);
    },
  });

  // "Instance-level" properties
  UserArchivedActivity.include({
    contentName: 'Activity',
  });

  // "Class-level" properties
  UserArchivedActivity.extend({
    getAll: getAll,
    contentName: 'Activity',
  });

  return UserArchivedActivity;
};

export default UserArchivedActivity;
