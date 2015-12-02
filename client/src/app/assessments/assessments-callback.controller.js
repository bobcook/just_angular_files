const AsssessmentsCallbackController = function ($state,
                                        $location,
                                        AssessmentStatus,
                                        UserAssessment,
                                        MBSAssessmentList) {
  'ngInject';

  const assessmentId = $location.search().id;

  AssessmentStatus.lastUserAssessmentGroup().then((group) => {
    // go to second questionnaire
    if (assessmentId === MBSAssessmentList.LAST_MBS_ASSESSMENT_ID) {
      const secondQuestionnaire = AssessmentStatus.getQuestionnaires(group)[1];
      const mbs = AssessmentStatus.getMBS(group);

      $state.go(
        'application.assessments-questionnaire', { id: secondQuestionnaire.id }
      );
      UserAssessment.get(mbs.id).then((userAssessment) => {
        // this is "fire and forget", so we're not using the returned promise
        AssessmentStatus.enqueueResultsUpdate(userAssessment);

        AssessmentStatus.updateCompletedUserAssessment(userAssessment);
      });
    }
  });
};

export default AsssessmentsCallbackController;
