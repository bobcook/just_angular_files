const UserAssessmentController = function (AssessmentStatus, $q) {
  'ngInject';

  this.showAssessmentBanner = false;
  this.showAssessmentResults = false;

  $q.all([
    AssessmentStatus.hasCompletedAssessments(),
    AssessmentStatus.lastUserAssessmentGroup(),
  ]).then((results) => {
    const hasCompleted = results[0];
    const lastUserAssessment = results[1] || {};

    this.showAssessmentBanner =
      AssessmentStatus.showAssessmentBanner(
        hasCompleted,
        lastUserAssessment.started,
        lastUserAssessment.completed
      );

    this.showAssessmentResults =
      AssessmentStatus.showAssessmentResults(hasCompleted);
  });
};

export default UserAssessmentController;
