const UserAssessmentController = function (AssessmentStatus,
                                           restrictedRedirectService,
                                           $q,
                                           $rootScope,
                                           dsoAuth) {
  'ngInject';

  restrictedRedirectService.filterAnonymous();

  const isRegisteredUser = function () {
    return $rootScope.$currentUser &&
      $rootScope.$currentUser.membershipStatus !== 'paid';
  };

  this.showAssessmentBanner = false;
  this.showAssessmentResults = false;
  this.showSystemMessaging = false;
  this.subscribeUrl = dsoAuth.dsoSubscribeAuth();

  $q.all([
    AssessmentStatus.hasCompletedAssessments(),
    AssessmentStatus.lastUserAssessmentGroup(),
  ]).then((results) => {
    const hasCompleted = results[0];
    const lastUserAssessment = results[1] || {};

    this.showAssessmentBanner = _.isEmpty(lastUserAssessment);
    this.showFinishAssessmentBanner =
      !_.isUndefined(lastUserAssessment) &&
      !lastUserAssessment.completed;

    this.showAssessmentResults = hasCompleted;
    this.showSystemMessaging = isRegisteredUser() && hasCompleted;
  });
};

export default UserAssessmentController;
