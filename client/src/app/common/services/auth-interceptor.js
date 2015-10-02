const authInterceptor = function ($localStorage) {
  'ngInject';

  return {
    request: function (config) {
      if (!config.headers) {
        config.headers = {};
      }

      let token = null;
      if ($localStorage.auth != null) {
        token = $localStorage.auth.sessionToken;
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
  };
};

export default authInterceptor;
