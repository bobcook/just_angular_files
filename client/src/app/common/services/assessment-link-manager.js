const assessmentLinkManager = function (AssessmentStatus,
                                        $assessmentsAuth,
                                        $state,
                                        $window,
                                        dsoAuth,
                                        UserAssessmentGroup,
                                        assessmentStates) {
  'ngInject';

  const lastUserAssessmentGroupPromise =
    AssessmentStatus.lastUserAssessmentGroup();

  const register = function () {
    const url = $state.get('application.assessments').url;
    $window.location.href = dsoAuth.dsoRegisterAuth(url);
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
  };
};

export default assessmentLinkManager;
