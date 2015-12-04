const NeuroPerformanceController = function (AssessmentResultCategory,
                                             AssessmentResultQueries) {
  'ngInject';

  const makeCategoryWithResult = function (category, neuroResults) {
    return {
      category: category,
      score: neuroResults[_.camelCase(category.slug)],
    };
  };

  const getNeuroResults = function () {
    return AssessmentResultQueries.accumulatedQueries().then(function (vals) {
      return vals.neuroResults;
    });
  };

  const getNeuroCategories = () => {
    return AssessmentResultCategory.neuroPerformance().then((categories) => {
      this.neuroCategories = categories;
    });
  };

  const setCategoryResults = (neuroResultsHistory) => {
    const neuroResult = _.first(neuroResultsHistory);

    this.categoryResults = _.map(this.neuroCategories, (category) => {
      return makeCategoryWithResult(category, neuroResult);
    });
  };

  getNeuroCategories()
    .then(getNeuroResults)
    .then(setCategoryResults);
};

export default NeuroPerformanceController;
