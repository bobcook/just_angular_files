const NeuroPerformanceResult = function (API_URL, railsResourceFactory) {
  'ngInject';

  const NeuroPerformanceResult = railsResourceFactory({
    name: 'neuro_performance',
    url: `${API_URL}/api/v1/me/assessment_results/` +
         `{{userAssessmentGroupId}}/neuro_performance`,
  });

  Object.defineProperty(NeuroPerformanceResult.prototype, 'scores', {
    get: function () {
      return _.pick(this, [
        'processingSpeed',
        'sustainedAttention',
        'workingMemory',
        'cognitiveFlexibility',
        'executiveFunction',
        'recognitionMemory',
      ]);
    },
  });

  return NeuroPerformanceResult;
};

export default NeuroPerformanceResult;
