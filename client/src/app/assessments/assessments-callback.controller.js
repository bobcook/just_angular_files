// After user finishes MBS tests, MBS redirects to '/assessments-callback?id=76'
// and triggers this controller
const AsssessmentsCallbackController = function ($state,
                                        $location,
                                        AssessmentStatus,
                                        UserAssessment,
                                        MBSAssessmentList) {
  'ngInject';

  const assessmentId = $location.search().id;

  AssessmentStatus.lastUserAssessmentGroup().then((group) => {
    if (assessmentId === MBSAssessmentList.LAST_MBS_ASSESSMENT_ID) {
      const nextAssessment = AssessmentStatus.getQuestionnaires(group)[0];
      const mbs = AssessmentStatus.getMBS(group);

      $state.go(
        'application.assessments-questionnaire', { id: nextAssessment.id }
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
