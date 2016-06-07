const UserArchiveController = function (UserArchivedActivity,
                                        restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterAnonymous('me');

  this.items = null;
  this.resource = UserArchivedActivity;
  UserArchivedActivity.getAll().then((userArchivedActivities) => {
    this.items = userArchivedActivities;
  });
};

export default UserArchiveController;
