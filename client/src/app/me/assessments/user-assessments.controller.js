const UserAssessmentController = function ($assessmentsAuth,
                                           AssessmentStatus,
                                           restrictedRedirectService,
                                           assessmentStates,
                                           $q,
                                           $rootScope,
                                           dsoAuth,
                                           assessmentLinkManager) {
  'ngInject';

  restrictedRedirectService.filterAnonymous('me');

  const isRegisteredUser = function () {
    return $rootScope.$currentUser &&
      $rootScope.$currentUser.membershipStatus !== 'paid';
  };

  this.showAssessmentBanner = false;
  this.showAssessmentResults = false;
  this.showSystemMessaging = false;
  this.subscribeUrl = dsoAuth.dsoSubscribeAuth();
  this.states = assessmentStates.states;
  this.assessmentState;
  this.authForAssessments = $assessmentsAuth.authenticate;
  assessmentLinkManager.getAssessmentLink().then((result) => {
    this.assessmentLink = result;
  });

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
    this.showSystemMessaging = isRegisteredUser();
    this.assessmentState = assessmentStates.getState(lastUserAssessment);
  });
};

export default UserAssessmentController;
