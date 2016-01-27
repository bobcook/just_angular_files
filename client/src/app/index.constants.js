const addConstants = function (module) {
  const addConstant = function (v, k) { module.constant(k, v); };

  const API_URL = window.__env['API_URL'];

  const ApiRoutes = {
    AARP_AUTH: `${API_URL}/api/v1/users/auth/aarp`,
    AUTH_TOKEN: ({ id }) => `${API_URL}/api/v1/auth_tokens/${id}`,
    COPY: `${API_URL}/api/v1/copy`,
    MBS_AUTH: `${API_URL}/api/v1/mbs/auth`,
    MBS_SAML_REQUEST: `${API_URL}/api/v1/mbs/saml_request`,
    MY_ASSESSMENT_RESULTS: `${API_URL}/api/v1/me/assessment_results`,
    SESSION_DESTROY: `${API_URL}/api/v1/users/auth`,
  };

  const constants = _.merge(
    {},
    window.__env, // load environment variables into constants
    {
      'ApiRoutes': ApiRoutes,
      '$moment': moment,
      '$stats': ss,
    }
  );

  _.each(constants, addConstant);
};

export default addConstants;
