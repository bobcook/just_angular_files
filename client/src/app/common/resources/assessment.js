const Assessment = function (API_URL, railsResourceFactory) {
  'ngInject';

  const asssessmentsURL = `${API_URL}/api/v1/assessments`;

  const Assessment = railsResourceFactory({
    name: 'assessment',
    url: `${asssessmentsURL}/{{id}}`,
  });

  return Assessment;
};

export default Assessment;
