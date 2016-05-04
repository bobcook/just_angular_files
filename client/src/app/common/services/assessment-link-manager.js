const assessmentLinkManager = function (AssessmentStatus,
                                        $assessmentsAuth,
                                        $state,
                                        $window,
                                        $featureDetection,
                                        dsoAuth,
                                        UserAssessmentGroup,
                                        restrictedRedirectService,
                                        assessmentStates) {
  'ngInject';

  const lastUserAssessmentGroupPromise =
    AssessmentStatus.lastUserAssessmentGroup();

  const register = function () {
    $window.location.href = dsoAuth.dsoRegisterAuth('/begin-assessment');
  };

  const authForAssessments = function () {
    $assessmentsAuth.authenticate();
  };

  const questionnaireRedirect = function () {
    lastUserAssessmentGroupPromise.then((lastGroup) => {
      const next = AssessmentStatus.getNextAssessment(lastGroup);
      $state.go('application.assessments-questionnaire', { id: next.id });
    });
  };

  const getNextAssessment = function (userAssessmentGroup) {
    return AssessmentStatus.getNextAssessment(userAssessmentGroup);
  };

  const startAssessment = () => {
    new UserAssessmentGroup()
    .create()
    .then(() => {
      authForAssessments();
    });
  };

  const continueAssessment = function (lastGroup) {
    const next = AssessmentStatus.getNextAssessment(lastGroup);
    if (next.type === 'AssessmentMBS') {
      return authForAssessments;
    } else {
      return questionnaireRedirect;
    }
  };

  const redirectToAssessment = function () {
    if (!$featureDetection.hasFlash()) {
      return $state.go('application.assessments');
    }
    AssessmentStatus.lastUserAssessmentGroup().then(function (group) {
      const notStarted =
        assessmentStates.getState(group) === assessmentStates.states.notStarted;

      if (notStarted) {
        startAssessment();
      } else {
        continueAssessment(group)();
      }
    });
  };

  const getAssessmentLink = function () {
    return lastUserAssessmentGroupPromise.then((lastGroup) => {
      switch (assessmentStates.getState(lastGroup)) {
      case assessmentStates.states.notStarted:
        return startAssessment;
      case assessmentStates.states.started:
        return continueAssessment(lastGroup);
      case assessmentStates.states.completed:
        return startAssessment;
      default:
        return register;
      }
    }, (_err) => {
      return register;
    });
  };

  return {
    getAssessmentLink: getAssessmentLink,
    getNextAssessment: getNextAssessment,
    redirectToAssessment: redirectToAssessment,
  };
};

export default assessmentLinkManager;
