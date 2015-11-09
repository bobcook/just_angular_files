const ActivityController = function (Activity,
                                     ActivityPagePresenter,
                                     ActivityReview,
                                     UserActivity,
                                     $stateParams) {
  'ngInject';

  Activity.get($stateParams.id).then((activity) => {
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
