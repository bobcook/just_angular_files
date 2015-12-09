const AssessmentResultQueries = function (AssessmentStatus,
                                          LifestyleResult,
                                          NeuroPerformanceResult,
                                          UserInfo,
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

  const getLifestyleResults = function (state) {
    const group = state.group;

    const params = {
      userAssessmentGroupId: group.id,
    };

    return LifestyleResult.query({}, params);
  };

  const getUserInfo = function (state) {
    const group = state.group;

    const params = {
      userAssessmentGroupId: group.id,
    };

    return UserInfo.query({}, params);
  };

  const accumulatedQueries = function (state) {
    state = state || {};

    return $p.accumulate(state, [
      $p.as('group', getLatestUserAssessmentGroup),
      $p.as('neuroResults', getNeuroResults),
      $p.as('lifestyleResults', getLifestyleResults),
    ]);
  };

  return {
    accumulatedQueries: accumulatedQueries,
    getLatestUserAssessmentGroup: getLatestUserAssessmentGroup,
    getLifestyleResults: getLifestyleResults,
    getNeuroResults: getNeuroResults,
    getUserInfo: getUserInfo,
  };
};

export default AssessmentResultQueries;