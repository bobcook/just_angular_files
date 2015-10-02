const ApiRoutes = function (API_URL) {
  'ngInject';

  return {
    AARP_AUTH: `${API_URL}/api/v1/users/auth/aarp`,
    AUTH_TOKEN: ({ id }) => `${API_URL}/api/v1/auth_tokens/${id}`,
    SESSION_DESTROY: `${API_URL}/api/v1/users/auth`,
  };
};

export default ApiRoutes;
