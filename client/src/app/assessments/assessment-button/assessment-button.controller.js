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
  this.flashEnabled = $featureDetection.hasFlash();
  assessmentLinkManager.getAssessmentLink().then((result) => {
    if (!this.hasFlash) {
      this.assessmentLink = function () {
        $state.go('application.assessments.required-technology');
      };
    }
    this.assessmentLink = result;
  });

  this.states = assessmentStates.states;
  const ctaTextMap = {};

  ctaTextMap[this.states.notStarted] = {
    paid: 'assessments_cta.paid.not_started',
    unpaid: 'assessments_cta.registered.not_started',
  };
  ctaTextMap[this.states.started] = {
    paid: 'assessments_cta.paid.started',
    unpaid: 'assessments_cta.registered.started',
  };
  ctaTextMap[this.states.completed] = {
    paid: 'assessments_cta.paid.completed',
    unpaid: 'assessments_cta.registered.completed',
  };
  ctaTextMap[this.states.anonymous] = {
    unpaid: 'assessments_cta.anonymous',
  };

  this.paidCTAText = () => {
    if (ctaTextMap[this.ctaState] && ctaTextMap[this.ctaState].paid) {
      return ctaTextMap[this.ctaState].paid;
    }
  };

  this.unpaidCTAText = () => {
    if (ctaTextMap[this.ctaState]) {
      return ctaTextMap[this.ctaState].unpaid;
    }
  };

  AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
    this.ctaState = assessmentStates.getState(lastGroup);
    assignSubscribeUrl();
  }, (err) => {
    if (err.status === 401) {
      this.ctaState = this.assessmentStates.anonymous;
      assignSubscribeUrl();
    }
  });
};

export default AssessmentButtonController;
