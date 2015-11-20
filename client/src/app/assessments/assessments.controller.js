const AsssessmentsController = function ($assessmentsAuth,
                                         Assessment) {
  'ngInject';

  Assessment.query().then((assessments) => {
    this.firstAssessmentId =  _.pluck(assessments, 'id')[0];
  });
};

export default AsssessmentsController;
