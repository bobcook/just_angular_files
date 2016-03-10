const AssessmentButtonController = function ($featureDetection,
                                             AssessmentStatus,
                                             assessmentStates,
                                             UserAssessmentGroup,
                                             $assessmentsAuth,
                                             dsoAuth) {
  'ngInject';

  this.assessmentStates = assessmentStates.states;
  this.subscribeUrl = dsoAuth.dsoSubscribeAuth('/begin-assessment');
  this.registerUrl = dsoAuth.dsoRegisterAuth('/begin-assessment');
  this.hasFlash = $featureDetection.hasFlash();
  this.buttonState;

  this.authForAssessments = function () {
    this.showMBSAuthLink = false;
    $assessmentsAuth.authenticate();
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

  this.startAssessment = () => {
    new UserAssessmentGroup()
    .create()
    .then(() => {
      AssessmentStatus.lastCompletedUserAssessmentGroup().then((lastGroup) => {
        if (lastGroup) {
          const assessment = AssessmentStatus.getNextAssessment(lastGroup);
          this.nextAssessmentId = assessment.id;
        }
      });
    });

    this.authForAssessments();
  };

  if (this.hasFlash) {
    AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
      this.lastGroup = lastGroup;
      if (!lastGroup || lastGroup.completed) {
        this.buttonText = 'Begin Assessment';
        this.buttonState = 'MBS';
      } else {
        resumeAssessment(lastGroup);
      }

      this.ctaState = assessmentStates.getState(lastGroup);
    }, (err) => {
      if (err.status === 401) {
        this.ctaState = this.assessmentStates.anonymous;
      }
    });
  }
};

export default AssessmentButtonController;
