const AsssessmentController = function ($stateParams,
                                        $location,
                                        $assessmentsAuth,
                                        Assessment,
                                        AssessmentResponse,
                                        UserAssessmentGroup,
                                        UserAssessment,
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

  this.userAssessmentId = 0;

  // get UserAssessmentId so that we can save the responses.
  // TODO: try to simplify this getting UserAssessmentId once we have the
  // MBS assessments response done
  UserAssessmentGroup.query().then((groups) => {
    const lastGroup = groups[groups.length - 1];
    const userAssessment =
      lastGroup.userAssessments.find(function (assessment) {
        return  assessment.assessmentId === Number($stateParams.id);
      });
    this.userAssessmentId = userAssessment.id;
  });

  // show questionnaire question that use radio buttons.
  // TODO: show questionnaire question that use select dropdown.
  // TODO: show MBS instruction for current assessment.
  Assessment.get($stateParams.id).then((assessment) => {
    if (assessment.type === 'AssessmentQuestionnaire') {
      this.questions = assessment.assessmentQuestions;
    }
  });

  const updateUserAssessment =  () => {
    UserAssessment.get(this.userAssessmentId).then((userAssessment) => {
      userAssessment.completed = true;
      userAssessment.update();
    });
  };

  // TODO: validate that all questions have answers
  const saveUserResponses =  () => {
    for (const key in this.responses) {
      new AssessmentResponse({
        assessmentQuestionId: key,
        response: this.responses[key],
        userAssessmentId: this.userAssessmentId,
      })
      .create();
    }
  };

  this.responses = {};
  this.submitForm = function () {
    updateUserAssessment();
    saveUserResponses();
  };

};

export default AsssessmentController;
