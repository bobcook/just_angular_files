const OverallResultsController = function (Activity,
                                           AssessmentResultQueries,
                                           AssessmentResultScores,
                                           AssessmentStatus,
                                           ExploreContent,
                                           RecommendedContent,
                                           $moment,
                                           $pillarFiltering,
                                           $promise,
                                           $q,
                                           $location,
                                           restrictedRedirectService) {
  'ngInject';

  restrictedRedirectService.filterAnonymous('me');

  const queries = AssessmentResultQueries;

  const DATE_FORMAT = 'MMMM D, YYYY';

  const formatDate = function (date) {
    return $moment.utc(Date.parse(date)).local().format(DATE_FORMAT);
  };

  const accumulatedQueries = () => {
    if (!_.isUndefined(this.accumulatedQueries)) {
      return $promise.of(this.accumulatedQueries);
    }

    return queries.accumulatedQueries().then((vals) => {
      this.accumulatedQueries = vals;
      return vals;
    }, function () {
      return $q.reject('no user assessments');
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

  const setAssessmentDate = () => {
    return accumulatedQueries().then((vals) => {
      this.assessmentDate = formatDate(vals.group.createdAt);
    });
  };

  const setOverallScore = () => {
    this.overallScore =
      AssessmentResultScores.overallScore(
        this.latestNeuroResults.scores,
        this.latestLifestyleResults.scores
      );
  };

  const setRecommendedContent = () => {
    RecommendedContent.query().then((recs) => {
      this.recommendedItems = recs;
    });
  };

  this.resource = RecommendedContent;
  this.shouldShowMore = false;

  this.showResultHistory = function () {
    return false; // TODO;
  };

  setNeuroResults()
    .then(setLifestyleResults)
    .then(setOverallScore)
    .then(setAssessmentDate)
    .then(setRecommendedContent);
};

export default OverallResultsController;
