const AsssessmentsController = function ($state, $featureDetection) {
  'ngInject';

  this.hasFlash = $featureDetection.hasFlash();

  this.openRequiredTechnologyModal = function () {
    $state.go('application.assessments.required-technology');
  };
};

export default AsssessmentsController;
