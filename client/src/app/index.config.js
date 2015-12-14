const config = function ($httpProvider,
                         $locationProvider,
                         $logProvider,
                         $moment,
                         $translateProvider,
                         ApiRoutes) {
  'ngInject';

  $httpProvider.interceptors.push('vanityUrlInterceptor');
  $httpProvider.interceptors.push('authInterceptor');

  $translateProvider
    .useUrlLoader(ApiRoutes.COPY)
    .useMissingTranslationHandlerLog()
    .useSanitizeValueStrategy('sanitize')
    .preferredLanguage('en');

  $locationProvider.html5Mode(true);

  $logProvider.debugEnabled(true);

  $moment.locale('en', {
    week : {
      dow : 1, // Set Monday as first day of week
    },
  });
};

export default config;
