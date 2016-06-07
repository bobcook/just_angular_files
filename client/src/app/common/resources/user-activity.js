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

  const getAll = () => {
    return UserActivity.query().then((res) => {
      const data = res.data && res.data.activities;
      const rawActivities = data ? _.pluck(data, 'activity') : [];
      return _.map(rawActivities, (activityData) => {
        return new UserActivity(activityData);
      });
    });
  };

  // "Class-level" properties
  UserActivity.extend({
    contentName: 'UserActivity',
    pluralContentName: 'Activities',
    archived: (activities) => _.filter(activities, (a) => a.archived),
    unarchived: (activities) => _.filter(activities, (a) => !a.archived),
    getAll: getAll,
  });

  // "Instance-level" properties
  UserActivity.include({
    contentName: 'UserActivity',
    pluralContentName: 'Activities',
    archive: function () {
      this.archived = true;
      this.update();
    },
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
