const AssessmentResponse = function (API_URL, railsResourceFactory) {
  'ngInject';

  const url = `${API_URL}/api/v1/me/assessment_responses`;

  const AssessmentResponse = railsResourceFactory({
    name: 'assessmentResponse',
    url: `${url}/{{id}}`,
  });

  return AssessmentResponse;
};

export default AssessmentResponse;
