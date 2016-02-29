const AsssessmentController = function ($stateParams,
                                        $featureDetection,
                                        $q,
                                        Assessment,
                                        UserAssessment,
                                        AssessmentStatus) {
  'ngInject';

  const userAssessmentId = $stateParams.id;
  let assessmentRedirect;
  const currentUserAssessment = UserAssessment.get(userAssessmentId);

  // text responses for questions without scores
  this.textResponses = {};
  // index of each response for questions with scores
  this.indexResponses = {};
  // all the possible scores for questions with scores
  this.showAssessment = false;
  this.hasFlash = $featureDetection.hasFlash();

  this.defaultBirthdate = new Date('1955-01-01T00:00:00');

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
        }
      });
    });
  };

  const scrollToInvalid = () => {
    const elInvalid = $('form').find('.ng-invalid');
    const headerHeight = $('.global-header').height() + 40;
    if (elInvalid.length) {
      $('html, body').animate({
        scrollTop: $(angular.element(elInvalid[0])).offset().top - headerHeight,
      }, 'slow');
    }
  };

  this.collectIndexResponses = (userAssessment) => {
    return Assessment.get(userAssessment.assessmentId).then((assessment) => {
      const scores = (assessment.type === 'AssessmentQuestionnaire')
                   ? AssessmentStatus.getAssessmentScores(assessment)
                   : {};

      return AssessmentStatus.saveIndexResponses(
        this.indexResponses, scores, userAssessmentId
      );
    });
  };

  this.submitForm = function (isValid) {
    if (!isValid) {
      scrollToInvalid();
      return;
    }

    currentUserAssessment.then((userAssessment) => {
      return $q.all([
        AssessmentStatus.updateCompletedUserAssessment(userAssessment),
        AssessmentStatus.saveTextResponses(
          this.textResponses, userAssessmentId
        ),
        this.collectIndexResponses(userAssessment),
      ]);
    }).then(assessmentRedirect);
  };

  if (this.hasFlash) {
    AssessmentStatus.lastCompletedUserAssessmentGroup().then((lastGroup) => {
      if (!lastGroup) { return; };

      assessmentFlowSetup(lastGroup);
      getQuestionnaireQuestions();
      this.submitButtonText = AssessmentStatus.setSubmitButtonText(lastGroup);
    });
  }
};

export default AsssessmentController;
