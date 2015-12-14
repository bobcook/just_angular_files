const vanityUrlInterceptor = function ($vanityUrlCheck, $url) {
  'ngInject';

  return {
    request: function (config) {
      $vanityUrlCheck.redirectIfNeeded();

      return config;
    },
  };
};

export default vanityUrlInterceptor;
