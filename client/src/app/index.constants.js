const addConstants = function (module) {
  const addConstant = function (v, k) { module.constant(k, v); };

  const API_URL = window.__env['API_URL'];

  const ApiRoutes = {
    AARP_AUTH: `${API_URL}/api/v1/users/auth/aarp`,
    ASSESSMENTS_SAML_REQUEST: `${API_URL}/api/v1/mbs/assessments_login`,
    ASSESSMENTS_AUTH: `${API_URL}/api/v1/mbs/auth`,
    AUTH_TOKEN: ({ id }) => `${API_URL}/api/v1/auth_tokens/${id}`,
    COPY: `${API_URL}/api/v1/copy`,
    SESSION_DESTROY: `${API_URL}/api/v1/users/auth`,
  };

  const MbsRoutes = {
    TAKE_ASSESSMENTS:
      'https://stage.mybrainsolutions.com/MyBrain/MyBrainAssessment.aspx',
  };

  const constants = _.merge(
    {},
    window.__env, // load environment variables into constants
    {
      'ApiRoutes': ApiRoutes,
      '$moment': moment,
      'MbsRoutes': MbsRoutes,
    }
  );

  _.each(constants, addConstant);
};

export default addConstants;
