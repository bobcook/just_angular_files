const httpsInterceptor = function ($window, $location) {
  'ngInject';

  return {
    request: function (config) {
      if ($window.location.protocol !== 'https:') {
        $window.location.href = $location.absUrl().replace('http', 'https');
      }

      return config;
    },
  };
};

export default httpsInterceptor;
