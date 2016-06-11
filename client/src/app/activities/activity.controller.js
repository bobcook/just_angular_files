const ActivityController = function (Activity,
                                     ActivityPagePresenter,
                                     ActivityReview,
                                     UserActivity,
                                     $stateParams,
                                     $location,
                                     restrictedRedirectService,
                                     $redirectContent) {
  'ngInject';

  restrictedRedirectService
    .showModalToUnpaidUsers('activities', $location.path(), true);

  const id = $stateParams.id.replace('.html', '');
  Activity.get(id).then((activity) => {
    $redirectContent.redirectCheck(activity);
    this.activity = activity.data;
    ActivityPagePresenter.forController(this, this.activity);
  });

  this.isSaved = false; // Will be overwritten by ss-save-user-content
  this.savedItem = null; // Will be overwritten by ss-save-user-content
  this.isContentDrawerOpen = true;
  this.isUserNamespace = false;
  this.resource = Activity;
  this.reviewResource = ActivityReview;
  this.userResource = UserActivity;
};

export default ActivityController;
