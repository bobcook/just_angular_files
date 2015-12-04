const OverallResultsController = function (Activity,
                                           AssessmentResultQueries) {
  'ngInject';

  const queries = AssessmentResultQueries;

  // TODO: add real fields for determining recommended content
  this.resource = Activity;
  this.shouldShowMore = false;
  this.resource.query().then((activities) => {
    this.recommendedItems = activities.data;
  });

  const setNeuroResults = () => {
    return queries.accumulatedQueries().then((vals) => {
      this.allNeuroResults = vals.neuroResults;
      this.latestNeuroResults = _.first(this.allNeuroResults);
    });
  };

  setNeuroResults();
};

export default OverallResultsController;
