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

    this.showAssessmentBanner = _.isEmpty(lastUserAssessment);
    this.showFinishAssessmentBanner =
      !_.isUndefined(lastUserAssessment) &&
      !lastUserAssessment.completed;

    this.showAssessmentResults = hasCompleted;

  });
};

export default UserAssessmentController;
