const UserAssessmentController = function (AssessmentStatus) {
  'ngInject';

  AssessmentStatus.hasCompletedAssessments().then((result) => {
    this.hasCompletedAssessments = result;
  });

};

export default UserAssessmentController;
