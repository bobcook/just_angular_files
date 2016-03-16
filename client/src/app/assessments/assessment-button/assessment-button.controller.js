const AssessmentButtonController = function ($featureDetection,
                                             AssessmentStatus,
                                             assessmentStates,
                                             UserAssessmentGroup,
                                             $assessmentsAuth,
                                             dsoAuth,
                                             assessmentLinkManager) {
  'ngInject';

  this.assessmentStates = assessmentStates.states;
  this.subscribeUrl = dsoAuth.dsoSubscribeAuth('/begin-assessment');
  this.registerUrl = dsoAuth.dsoRegisterAuth('/begin-assessment');
  this.hasFlash = $featureDetection.hasFlash();
  this.buttonState;
  assessmentLinkManager.getAssessmentLink().then((result) => {
    this.assessmentLink = result;
  });

  if (this.hasFlash) {
    AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
      this.ctaState = assessmentStates.getState(lastGroup);
    }, (err) => {
      if (err.status === 401) {
        this.ctaState = this.assessmentStates.anonymous;
      }
    });
  }
};

export default AssessmentButtonController;
