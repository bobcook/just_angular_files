const UserArchiveController = function (UserActivity,
                                        restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterAnonymous('me');

  this.items = null;
  this.resource = UserActivity;
  UserActivity.getAll().then((userActivities) => {
    this.items = UserActivity.archived(userActivities);
  });
};

export default UserArchiveController;
