const httpsInterceptor = function ($window, $location) {
  'ngInject';

  return {
    request: function (config) {
      const isHttps = function () {
        return $window.location.protocol === 'https:';
      };

      const isProd = function () {
        return $window.__env.envName === 'production';
      };

      if (isProd() && !isHttps()) {
        $window.location.href = $location.absUrl().replace('http', 'https');
      }

      return config;
    },
  };
};

export default httpsInterceptor;
