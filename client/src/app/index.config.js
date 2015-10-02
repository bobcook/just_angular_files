var config = function ($httpProvider, $locationProvider, $logProvider) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');

  $locationProvider.html5Mode(true);
  $logProvider.debugEnabled(true);
};

export default config;
