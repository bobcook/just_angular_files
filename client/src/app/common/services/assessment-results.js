const $assessmentResults = function (ApiRoutes, $http) {
  'ngInject';

  const enqueueForRetrieval = function (userAssessment) {
    const params = {
      'user_assessment_id': userAssessment.id,
    };
    return $http.post(ApiRoutes.MY_ASSESSMENT_RESULTS, params);
  };

  return {
    enqueueForRetrieval: enqueueForRetrieval,
  };
};

export default $assessmentResults;
