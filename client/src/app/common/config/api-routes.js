var ApiRoutes = function (API_URL) {
  'ngInject';

  return {
    AARP_AUTH: `${API_URL}/users/auth/aarp`,
    AUTH_TOKEN: ({ id }) => `${API_URL}/api/v1/auth_tokens/${id}`,
  };
};

export default ApiRoutes;
