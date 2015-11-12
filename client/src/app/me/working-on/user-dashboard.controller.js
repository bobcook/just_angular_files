const UserDashboardController = function (UserActivity) {
  'ngInject';

  this.items = null;

  UserActivity.query().then((response) => {
    // TODO: make it so this normalization isn't necessary
    const makeActivity = function (activityData) {
      return new UserActivity(activityData);
    }
    const activityData = response.data && response.data.activities;
    const rawActivities = activityData ? _.pluck(activityData, 'activity') : [];
    const activities = _.map(rawActivities, makeActivity);
    this.items = activities;
  });
};

export default UserDashboardController;
