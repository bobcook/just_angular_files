const AsssessmentController = function ($stateParams,
                                        Assessment,
                                        UserAssessment,
                                        AssessmentStatus,
                                        MbsRoutes) {
  'ngInject';

  this.mbsUrl = MbsRoutes.TAKE_ASSESSMENTS;
  // text responses for questions without scores
  this.textResponses = {};
  // index of each response for questions with scores
  this.indexResponses = {};
  // all the possible scores for questions with scores
  let assessmentScores = {};
  this.showAssessment = false;
  const userAssessmentId = $stateParams.id;
  let assessmentRedirect;

  AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
    const secondQuestionnaire =
      AssessmentStatus.getQuestionnaires(lastGroup)[1];
    assessmentRedirect =
      AssessmentStatus.submitAssessmentRedirect(lastGroup, userAssessmentId);
    this.showResultsLink = Number(userAssessmentId) === secondQuestionnaire.id;
  });

  if (userAssessmentId) {
    const currentUserAssessment = UserAssessment.get(userAssessmentId);

    currentUserAssessment.then((userAssessment) => {
      Assessment.get(userAssessment.assessmentId).then((assessment) => {
        if (userAssessment.completed) {
          return;
        }
        if (assessment.type === 'AssessmentQuestionnaire') {
          this.showAssessment = true;
          this.questions = assessment.assessmentQuestions;
          assessmentScores = AssessmentStatus.getAssessmentScores(assessment);
        }
      });
    });

    this.submitForm = function (isValid) {
      if (isValid) {
        currentUserAssessment.then(function (userAssessment) {
          AssessmentStatus.updateCompletedUserAssessment(userAssessment);
        });

        AssessmentStatus
          .saveTextResponses(this.textResponses, userAssessmentId);
        AssessmentStatus
          .saveIndexResponses(
            this.indexResponses, assessmentScores, userAssessmentId
          );

        assessmentRedirect();
      }
    };
  }

};

export default AsssessmentController;
