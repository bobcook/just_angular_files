const AssessmentResultScores = function ($stats) {
  'ngInject';

  const zeroIfEmptyElse = function (fn) {
    return function (args) {
      const numEntries = _.size(args);
      if (numEntries === 0) { return 0; }

      return fn(args);
    };
  };

  const scoresAvg = zeroIfEmptyElse(function (scoresHash) {
    return $stats.mean(_.values(scoresHash));
  });

  const multiScoresAvg = zeroIfEmptyElse(function (listOfScoreHashes) {
    return $stats.mean(_.map(listOfScoreHashes, scoresAvg));
  });

  const overallScore = function (neuroResults, lifestyleResults) {
    return _.round(multiScoresAvg([neuroResults, lifestyleResults]), 1);
  };

  return {
    overallScore: overallScore,
    multiScoresAvg: multiScoresAvg,
    scoresAvg: scoresAvg,
  };
};

export default AssessmentResultScores;
