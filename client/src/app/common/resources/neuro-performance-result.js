const NeuroPerformanceResult = function (API_URL, railsResourceFactory) {
  'ngInject';

  const NeuroPerformanceResult = railsResourceFactory({
    name: 'neuro_performance',
    url: `${API_URL}/api/v1/me/assessment_results/` +
         `{{userAssessmentGroupId}}/neuro_performance`,
  });

  return NeuroPerformanceResult;
};

export default NeuroPerformanceResult;
