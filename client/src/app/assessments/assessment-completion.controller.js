const AssessmentCompletionController = function ($state, dsoAuth) {
  'ngInject';

  const redirectPath = $state.href('application.user.assessments')
  this.scubscribeUrl = dsoAuth.dsoSubscribeAuth(redirectPath);
};

export default AssessmentCompletionController;
