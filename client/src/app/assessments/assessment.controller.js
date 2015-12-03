const AsssessmentController = function ($stateParams,
                                        Assessment,
                                        UserAssessment,
                                        AssessmentStatus) {
  'ngInject';

  // text responses for questions without scores
  this.textResponses = {};
  // index of each response for questions with scores
  this.indexResponses = {};
  // all the possible scores for questions with scores
  let assessmentScores = {};
  this.showAssessment = false;
  const userAssessmentId = $stateParams.id;
  let assessmentRedirect;
  const currentUserAssessment = UserAssessment.get(userAssessmentId);

  const assessmentFlowSetup = (lastGroup) => {
    const secondQuestionnaire =
      AssessmentStatus.getQuestionnaires(lastGroup)[1];
    this.showResultsLink = Number(userAssessmentId) === secondQuestionnaire.id;

    assessmentRedirect =
      AssessmentStatus.submitAssessmentRedirect(lastGroup, userAssessmentId);
  };

  const getQuestionnaireQuestions = () => {
    currentUserAssessment.then((userAssessment) => {
      if (!userAssessment.id || userAssessment.completed) { return; }

      Assessment.get(userAssessment.assessmentId).then((assessment) => {
        if (assessment.type === 'AssessmentQuestionnaire') {
          this.showAssessment = true;
          this.questions = assessment.assessmentQuestions;
          assessmentScores = AssessmentStatus.getAssessmentScores(assessment);
        }
      });
    });
  };

  this.submitForm = function (isValid) {
    if (!isValid) { return; }

    currentUserAssessment.then(function (userAssessment) {
      AssessmentStatus.updateCompletedUserAssessment(userAssessment);
    });

    AssessmentStatus.saveTextResponses(this.textResponses, userAssessmentId);
    AssessmentStatus.saveIndexResponses(
      this.indexResponses, assessmentScores, userAssessmentId
    );

    assessmentRedirect();
  };

  AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
    if (!lastGroup) { return; };

    assessmentFlowSetup(lastGroup);
    getQuestionnaireQuestions();
  });

};

export default AsssessmentController;
