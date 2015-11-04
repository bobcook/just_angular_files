const AsssessmentsController = function ($assessmentsAuth) {
  'ngInject';

  this.authForAssessments = function () {
    $assessmentsAuth.authenticate();
  };
};

export default AsssessmentsController;
