const AsssessmentsController = function ($assessmentsAuth,
                                         AssessmentStatus,
                                         MBSAssessmentList,
                                         UserAssessmentGroup) {
  'ngInject';

  this.buttonState;

  this.authForAssessments = function () {
    this.showMBSAuthLink = false;
    $assessmentsAuth.authenticate();
  };

  const createAssessment = () => {
    new UserAssessmentGroup()
    .create()
    .then(() => {
      AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
        const assessment = AssessmentStatus.getNextAssessment(lastGroup);
        this.nextAssessmentId = assessment.id;
      });
    });
  };

  const resumeAssessment = (userAssessmentGroup) => {
    const nextAssessment =
      AssessmentStatus.getNextAssessment(userAssessmentGroup);

    // TODO: considering how to consolidate these type-based assessments actions
    //  so there are fewer ifs
    if (nextAssessment.type === 'AssessmentMBS') {
      // user already started mbs assessments
      if (userAssessmentGroup.lastMbs) {
        this.nextMBSAssessmentId =
          MBSAssessmentList.ASSESSMENTS[userAssessmentGroup.lastMbs].slug;
        this.buttonState = 'continueMBS';
      // user has not started mbs assessments
      } else {
        this.buttonState = 'beginMBS';
      }
    // user already started the questionnare
    } else {
      this.nextAssessmentId = nextAssessment.id;
      this.buttonState = 'continueQuestionnaire';
    }
  };

  AssessmentStatus.lastUserAssessmentGroup().then((lastGroup) => {
    if (lastGroup && !lastGroup.completed) {
      resumeAssessment(lastGroup);
    // user has not started the questionnaire
    } else {
      createAssessment();
      this.buttonState = 'beginQuestionnaire';
    }
  });
};

export default AsssessmentsController;

