const UserArchiveController = function (UserArchivedActivity,
                                        restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.showModalToAnonymousUsers('me');

  this.items = null;
  this.resource = UserArchivedActivity;
  UserArchivedActivity.getAll().then((userArchivedActivities) => {
    this.items = userArchivedActivities;
  });
};

export default UserArchiveController;
