const AsssessmentsController = function ($assessmentsAuth,
                                         Assessment) {
  'ngInject';

  this.authForAssessments = function () {
    $assessmentsAuth.authenticate();
  };

  Assessment.query().then((assessments) => {
    this.firstAssessmentId =  _.pluck(assessments, 'id')[0];
  });
};

export default AsssessmentsController;
