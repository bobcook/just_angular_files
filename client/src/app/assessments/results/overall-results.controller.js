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

  const scoresAvg = function (scoresHash) {
    const numEntries = _.size(scoresHash);
    if (numEntries === 0) { return 0; }

    return _.sum(scoresHash) / numEntries;
  };

  const setOverallScore = () => {
    const allResults =
      _.merge({}, this.latestNeuroResults, this.latestLifestyleResults);

    this.overallScore = _.round(scoresAvg(allResults), 1);
  };

  setNeuroResults()
    .then(setLifestyleResults)
    .then(setOverallScore)
};

export default OverallResultsController;
