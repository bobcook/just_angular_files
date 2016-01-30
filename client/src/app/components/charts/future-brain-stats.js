const FutureBrainStats = function (API_URL,
                                   $http,
                                   $promise,
                                   $stats) {
  'ngInject';

  const $p = $promise;

  const FUTURE_BRAIN_DATA = 'future_brain_data.json';

  // Hardcoded constants of ppl who take assessment
  const SCORE_MEAN = 5.5;
  const SCORE_STD_DEV = 2.0;

  const zScore = function (score) {
    return $stats.zScore(score, SCORE_MEAN, SCORE_STD_DEV);
  };

  const isNegative = function (val) {
    return val < 0;
  };

  const percentile = function (score) {
    const z = zScore(score);

    // standard-statistics std normal table is 0-300 instead of 0-3,
    // so we need to * 100 to perform the table lookup below
    const origVal = _.parseInt(z * 100);

    const wasNegative = isNegative(origVal);
    const lookupVal = wasNegative ? Math.abs(origVal) : origVal;
    const result = $stats.standardNormalTable[lookupVal];

    // A negative z-score means we're on the "first half" of the
    // distribution / we scored below the mean, so we have to subtract
    // "everything after" it.
    //
    // Otherwise we scored above the mean, so we just return the result.
    return wasNegative ? (1.0 - result) : result;
  };

  const getFutureBrainData = function () {
    return $http.get(FUTURE_BRAIN_DATA);
  };

  const closest = function (n, val) {
    return n * Math.round(val / n);
  };

  const percentileOutOf = function (n, score) {
    return percentile(score) * n;
  };

  const ageProgression = function (score) {
    return getFutureBrainData().then(function (result) {
      const data = result.data;
      const percentileScore = percentileOutOf(10, score);

      // future brain data is quantized to increments of .5,
      // so we need to get the closest one
      const closestScore = closest(0.5, percentileScore).toFixed(1);

      return data[closestScore];
    });
  };

  const getAgeProgressions = function (neuroResultOverall) {
    return $p.accumulate({}, [
      $p.as('current', () => ageProgression(neuroResultOverall)),
    ]);
  };

  return {
    getAgeProgressions: getAgeProgressions,
    ageProgression: ageProgression,
    percentile: percentile,
    scoreMean: SCORE_MEAN,
    scoreStdDev: SCORE_STD_DEV,
    zScore: zScore,
  };
};

export default FutureBrainStats;
