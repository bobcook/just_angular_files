const AssessmentCompletionController = function ($state, dsoAuth) {
  'ngInject';

  const redirectPath = $state.href('application.user.assessments.overall');
  this.subscribeUrl = dsoAuth.dsoSubscribeAuth(redirectPath,
                                               'SSS-JOINSS-LP-ASSESSCOMP');
};

export default AssessmentCompletionController;
