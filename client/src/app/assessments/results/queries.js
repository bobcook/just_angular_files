const AssessmentResultQueries = function (AssessmentStatus,
                                          NeuroPerformanceResult,
                                          $promise) {
  'ngInject';

  const $p = $promise;

  const getLatestUserAssessmentGroup = function () {
    return AssessmentStatus.lastUserAssessmentGroup();
  };

  const getNeuroResults = function (state) {
    const group = state.group;

    const params = {
      userAssessmentGroupId: group.id,
    };

    return NeuroPerformanceResult.query({}, params);
  };

  const accumulatedQueries = function (state) {
    state = state || {};

    return $p.accumulate(state, [
      $p.as('group', getLatestUserAssessmentGroup),
      $p.as('neuroResults', getNeuroResults)
    ]);
  };

  return {
    accumulatedQueries: accumulatedQueries,
    getLatestUserAssessmentGroup: getLatestUserAssessmentGroup,
    getNeuroResults: getNeuroResults,
  };
};

export default AssessmentResultQueries;
