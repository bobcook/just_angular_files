const OverallResultsController = function (Activity,
                                           AssessmentResultQueries,
                                           AssessmentResultScores,
                                           ExploreContent,
                                           $moment,
                                           $pillarFiltering,
                                           $promise) {
  'ngInject';

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

  // TODO: Replace w/ real recommended content -- this
  // currently just looks for highest pillar and gets
  // activities w/ that pillar
  const setRecommendedContent = () => {
    const exploreParams = {
      activities: 25,
      articles: 0,
      recipes: 0,
      games: 0,
    };

    const highestPillar =
      _.find(_.pairs(this.latestLifestyleResults.scores), (vals) => {
        const name = vals[0];
        const score = vals[1];
        return score === _.max(this.latestLifestyleResults.scores);
      })[0];

    $pillarFiltering.pillarByDisplayName(highestPillar).then((pillar) => {
      ExploreContent.query(exploreParams).then((result) => {
        const activities = result.data.activities;

        $pillarFiltering.filterByPillar(pillar, activities).then((filtered) => {
          this.recommendedItems = filtered;
        });
      });
    });
  };

  // TODO: determine real recommended content
  this.resource = Activity;
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
