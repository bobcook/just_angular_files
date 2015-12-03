const AssessmentResultCategory = function (API_URL, railsResourceFactory) {
  'ngInject';

  const url = `${API_URL}/api/v1/me/assessment_results/categories`;

  const AssessmentResultCategory = railsResourceFactory({
    name: 'category',
    pluralName: 'categories',
    idAttribute: 'name',
    url: `${url}/{{id}}`,
    httpConfig: {
      cache: true,
    },
  });

  const typeIs = function (type) {
    return (category) => category.type === type;
  };

  AssessmentResultCategory.neuroPerformance = function () {
    return AssessmentResultCategory.query().then(function (results) {
      return _.filter(results, typeIs('NeuroPerformance'));
    });
  };

  AssessmentResultCategory.lifestyle = function () {
    return AssessmentResultCategory.query().then(function (results) {
      return _.filter(results, typeIs('Lifestyle'));
    });
  };

  return AssessmentResultCategory;
};

export default AssessmentResultCategory;
