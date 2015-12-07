const OverallResultsController = function (Activity,
                                           AssessmentResultQueries,
                                           $promise) {
  'ngInject';

  const queries = AssessmentResultQueries;

  // TODO: add real fields for determining recommended content
  this.resource = Activity;
  this.shouldShowMore = false;
  this.resource.query().then((activities) => {
    this.recommendedItems = activities.data;
  });

  const accumulatedQueries = () => {
    if (!_.isUndefined(this.accumulatedQueries)) {
      return $promise.of(this.accumulatedQueries);
    }

    return queries.accumulatedQueries().then((vals) => {
      this.accumulatedQueries = vals;
      return vals;
    });
  };

  const setNeuroResults = () => {
    return accumulatedQueries().then((vals) => {
      this.allNeuroResults = vals.neuroResults;
      this.latestNeuroResults = _.first(this.allNeuroResults);
    });
  };

  const setLifestyleResults = () => {
    return accumulatedQueries().then((vals) => {
      this.allLifestyleResults = vals.lifestyleResults;
      this.latestLifestyleResults = _.first(this.allLifestyleResults);
    });
  };

  setNeuroResults().then(setLifestyleResults);
};

export default OverallResultsController;
