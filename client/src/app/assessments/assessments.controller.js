const AsssessmentsController = function ($assessmentsAuth,
                                         UserAssessmentGroup,
                                         Assessment) {
  'ngInject';

  UserAssessmentGroup.query().then((groups) => {
    const lastGroup = groups[groups.length -1];
    // TODO: might consider putting 'happy path' condition first
    // resume existing assessments
    if (lastGroup && lastGroup.completed === false) {
      const nextAssessment =
        lastGroup.userAssessments.find((userAssessment) => {
          return userAssessment.completed === false;
        });
      this.nextAssessmentId = nextAssessment.assessmentId;
      this.assessmentsCompleted = false;
    // begin new assessments
    } else {
      Assessment.query().then((assessments) => {
        this.nextAssessmentId = assessments[0].id;
      });
      this.assessmentsCompleted = true;
    }

  });

  this.createUserAssessments = function () {
    new UserAssessmentGroup()
    .create();
  };
};

export default AsssessmentsController;
