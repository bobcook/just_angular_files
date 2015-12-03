const AsssessmentsController = function ($assessmentsAuth,
                                         AssessmentStatus,
                                         UserAssessmentGroup) {
  'ngInject';

  this.buttonState;

  this.authForAssessments = function () {
    this.showMBSAuthLink = false;
    $assessmentsAuth.authenticate();
  };

  const createAssessment = () => {
    this.buttonText = 'Begin Assessment';
    this.buttonState = 'Questionnaire';

    new UserAssessmentGroup()
    .create()
    .then(() => {
      AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
        if (lastGroup) {
          const assessment = AssessmentStatus.getNextAssessment(lastGroup);
          this.nextAssessmentId = assessment.id;
        }
      });
    });
  };

  const resumeAssessment = (userAssessmentGroup) => {
    this.buttonText = 'Continue Assessment';
    const nextAssessment =
      AssessmentStatus.getNextAssessment(userAssessmentGroup);

    if (nextAssessment.type === 'AssessmentMBS') {
      this.buttonState = 'MBS';
    } else {
      this.buttonState = 'Questionnaire';
      this.nextAssessmentId = nextAssessment.id;
    }
  };

  AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
    if (!lastGroup || lastGroup.completed) {
      createAssessment();
    } else {
      resumeAssessment(lastGroup);
    }
  });
};

export default AsssessmentsController;

