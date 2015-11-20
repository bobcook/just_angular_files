const AsssessmentController = function ($stateParams,
                                        $location,
                                        $assessmentsAuth,
                                        Assessment,
                                        MbsRoutes) {
  'ngInject';

  // TODO: keep track of which assessments have been completed to determine
  // which assessment to show

  this.mbsUrl = MbsRoutes.TAKE_ASSESSMENTS;

  // TODO: dynamically get last questionnaire id
  const LAST_QUESTIONNAIRE_ID = '3';
  const assessmentId = $location.url().split('/assessment/')[1];

  this.showResultsLink = assessmentId === LAST_QUESTIONNAIRE_ID;

  this.authForAssessments = function () {
    $assessmentsAuth.authenticate();
  };

  Assessment.get($stateParams.id).then((assessment) => {
    if (assessment.type === 'AssessmentQuestionnaire') {
      this.questions = assessment.assessmentQuestions;
    }
  });

};

export default AsssessmentController;
