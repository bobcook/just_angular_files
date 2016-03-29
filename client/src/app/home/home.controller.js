const HomeController = function (AssessmentStatus,
                                 ExploreContent,
                                 $rootScope,
                                 $state,
                                 dsoAuth,
                                 restrictedRedirectModalService,
                                 assessmentStates) {
  'ngInject';

  restrictedRedirectModalService.showModal();

  const assignBannerValues = (lastGroupState) => {
    this.showAssessmentStartBanner = isNotStarted(lastGroupState);
    this.showAssessmentFinishBanner = isStarted(lastGroupState);
    this.showAssessmentSubscribeBanner = isCompleted(lastGroupState);
  };

  const isNotStarted = function (lastGroupState) {
    return lastGroupState === assessmentStates.states.notStarted;
  };

  const isStarted = function (lastGroupState) {
    return lastGroupState === assessmentStates.states.started;
  };

  const isCompleted = function (lastGroupState) {
    return lastGroupState === assessmentStates.states.completed;
  };

  this.subscribeUrl =
    dsoAuth.dsoSubscribeAuth(
      $state.href('application.user.assessments.overall')
    );

  AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
    assignBannerValues(assessmentStates.getState(lastGroup));
  });

  const currentUser = $rootScope.$currentUser;

  const setHasCompletedAssessments = () => {
    return AssessmentStatus.hasCompletedAssessments().then((result) => {
      this.hasCompletedAssessments = result;
    });
  };

  this.selectedPillar = null; // Will be overwritten by pillar filters
  this.resource = ExploreContent;

  // TODO: change once actual auth / permissions in place?
  //
  // Need to allow non-logged in users to see the homepage, but
  // hasCompletedAssessments is a restricted route
  if (currentUser.isLoggedIn) { setHasCompletedAssessments(); }
};

export default HomeController;
