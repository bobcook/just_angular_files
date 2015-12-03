const NeuroPerformanceController = function (AssessmentResultCategory,
                                             AssessmentStatus,
                                             NeuroPerformanceResult) {
  'ngInject';

  const makeCategoryWithResult = function (category, neuroResults) {
    return {
      category: category,
      score: neuroResults[_.camelCase(category.slug)],
    };
  };

  const getLatestUserAssessmentGroup = () => {
    return AssessmentStatus.lastUserAssessmentGroup().then((group) => {
      this.userAssessmentGroup = group;
    });
  };

  const getNeuroCategories = () => {
    return AssessmentResultCategory.neuroPerformance().then((categories) => {
      this.neuroCategories = categories;
    });
  };

  const getNeuroResults = () => {
    const params = {
      userAssessmentGroupId: this.userAssessmentGroup.id,
    };
    return NeuroPerformanceResult.query({}, params);
  };

  const setCategoryResults = (neuroResultsHistory) => {
    const neuroResult = _.first(neuroResultsHistory);

    this.categoryResults = _.map(this.neuroCategories, (category) => {
      return makeCategoryWithResult(category, neuroResult);
    });
  };

  getLatestUserAssessmentGroup()
    .then(getNeuroCategories)
    .then(getNeuroResults)
    .then(setCategoryResults);
};

export default NeuroPerformanceController;
