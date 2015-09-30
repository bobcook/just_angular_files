const ApiRoutes = function (API_URL) {
  'ngInject';

  return {
    AARP_AUTH: `${API_URL}/api/v1/users/auth/aarp`,
    ASSESSMENTS_AUTH: `${API_URL}/api/v1/mbs/assessments_login`,
    AUTH_TOKEN: ({ id }) => `${API_URL}/api/v1/auth_tokens/${id}`,
    SESSION_DESTROY: `${API_URL}/api/v1/users/auth`,
  };
};

export default ApiRoutes;
