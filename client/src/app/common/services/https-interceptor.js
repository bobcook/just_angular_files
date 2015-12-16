const httpsInterceptor = function ($window, $location) {
  'ngInject';

  return {
    request: function (config) {
      const isLocal = function () {
        return _.startsWith($window.location.host, 'localhost');
      };

      const isHttps = function () {
        return $window.location.protocol === 'https:';
      };

      if (!isHttps() && !isLocal()) {
        $window.location.href = $location.absUrl().replace('http', 'https');
      }

      return config;
    },
  };
};

export default httpsInterceptor;
