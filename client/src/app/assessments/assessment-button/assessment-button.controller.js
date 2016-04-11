const AssessmentButtonController = function ($featureDetection,
                                             AssessmentStatus,
                                             assessmentStates,
                                             UserAssessmentGroup,
                                             $assessmentsAuth,
                                             dsoAuth,
                                             $state,
                                             assessmentLinkManager) {
  'ngInject';

  const getRedirectPath = (ctaState) => {
    if (ctaState === assessmentStates.states.completed) {
      return $state.href('application.user.assessments.overall');
    } else {
      return '/begin-assessment';
    }
  };

  const assignSubscribeUrl = () => {
    const redirectPath = getRedirectPath(this.ctaState);
    this.subscribeUrl = dsoAuth.dsoSubscribeAuth(redirectPath,
                                                 'SSS-JOINSS-LP-ASSESS');
  };

  this.assessmentStates = assessmentStates.states;
  this.registerUrl = dsoAuth.dsoRegisterAuth('/begin-assessment');
  this.hasFlash = $featureDetection.hasFlash();
  assessmentLinkManager.getAssessmentLink().then((result) => {
    this.assessmentLink = result;
  });

  if (this.hasFlash) {
    AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
      this.ctaState = assessmentStates.getState(lastGroup);
      assignSubscribeUrl();
    }, (err) => {
      if (err.status === 401) {
        this.ctaState = this.assessmentStates.anonymous;
        assignSubscribeUrl();
      }
    });
  }
};

export default AssessmentButtonController;
