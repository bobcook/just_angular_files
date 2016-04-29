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
    this.assessmentLink = result;
  });
  this.openRequiredTechnologyModal = function () {
    $state.go('application.assessments.required-technology');
  };

  const states = assessmentStates.states;
  const ctaTextMap = {};
  ctaTextMap[states.notStarted] = {
    paid: {
      main: 'assessments_cta.paid.main.not_started',
    },
    unpaid: {
      main: 'assessments_cta.registered.main.not_started',
      sub: 'assessments_cta.registered.sub.started',
    },
  };
  ctaTextMap[states.started] = {
    paid: {
      main: 'assessments_cta.paid.main.started',
    },
    unpaid: {
      main: 'assessments_cta.registered.main.started',
      sub: 'assessments_cta.registered.sub.started',
    },
  };
  ctaTextMap[states.completed] = {
    paid: {
      main: 'assessments_cta.paid.main.completed',
    },
    unpaid: {
      main: 'assessments_cta.registered.main.completed',
      sub: 'assessments_cta.registered.sub.completed',
    },
  };
  ctaTextMap[states.anonymous] = {
    unpaid: {
      main: 'assessments_cta.anonymous.main',
    },
  };

  this.paidCTAText = () => {
    return ctaTextMap[this.ctaState].paid.main;
  };

  this.unpaidCTAText = () => {
    return ctaTextMap[this.ctaState].unpaid;
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
