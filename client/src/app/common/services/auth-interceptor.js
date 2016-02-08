const authInterceptor = function ($localStorage,
                                  $injector) {
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

    responseError: function (config) {
      if (config.status === 401) {
        $localStorage.auth = null;
        // lazy load $state because of circular dependency error
        return $injector.get('$state').go('application.login-failure');
      } else {
        return config;
      }
    },
  };
};

export default authInterceptor;
