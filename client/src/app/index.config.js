const config = function ($httpProvider,
                         $locationProvider,
                         $logProvider,
                         $translateProvider,
                         ApiRoutes) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');
  $translateProvider
    .useUrlLoader(ApiRoutes.COPY)
    .useMissingTranslationHandlerLog()
    .useSanitizeValueStrategy('sanitize')
    .preferredLanguage('en');
  $locationProvider.html5Mode(true);
  $logProvider.debugEnabled(true);
};

export default config;
