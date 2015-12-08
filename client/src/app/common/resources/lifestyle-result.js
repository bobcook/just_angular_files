const LifestyleResult = function (API_URL, railsResourceFactory) {
  'ngInject';

  const LifestyleResult = railsResourceFactory({
    name: 'lifestyle',
    url: `${API_URL}/api/v1/me/assessment_results/` +
         `{{userAssessmentGroupId}}/lifestyle`,
  });

  Object.defineProperty(LifestyleResult.prototype, 'scores', {
    get: function () {
      return _.pick(this, [
        'move',
        'discover',
        'relax',
        'nourish',
        'connect',
      ]);
    },
  });

  return LifestyleResult;
};

export default LifestyleResult;
