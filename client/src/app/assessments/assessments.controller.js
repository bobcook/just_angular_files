const AsssessmentsController = function ($featureDetection) {
  'ngInject';

  this.hasFlash = $featureDetection.hasFlash();

};

export default AsssessmentsController;
