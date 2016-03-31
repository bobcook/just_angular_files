const SystemMessageController = function ($state,
                                          $rootScope,
                                          dsoAuth,
                                          AssessmentStatus,
                                          assessmentStates) {
  'ngInject';

  const assignBannerValues = (lastGroupState) => {
    this.showAssessmentStartBanner = !$rootScope.$currentUser || isNotStarted(lastGroupState);
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
};

export default SystemMessageController;
