const UserDashboardController = function (UserActivity,
                                          restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterAnonymous('me');

  this.items = null;

  UserActivity.getAll().then((userActivities) => {
    this.items = UserActivity.unarchived(userActivities);
  });

  this.numItems = function () {
    return _.size(this.items);
  };

  this.resource = UserActivity;
};

export default UserDashboardController;
