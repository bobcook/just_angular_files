import advertising from './common/services/advertising';

const config = function ($httpProvider,
                         $locationProvider,
                         $logProvider,
                         $moment,
                         $translateProvider,
                         ApiRoutes,
                         DoubleClickProvider,
                         $windowProvider) {
  'ngInject';

  $httpProvider.interceptors.push('httpsInterceptor');
  $httpProvider.interceptors.push('authInterceptor');

  $translateProvider
    .useUrlLoader(ApiRoutes.COPY)
    .useMissingTranslationHandlerLog()
    .useSanitizeValueStrategy('sanitize')
    .preferredLanguage('en');

  $locationProvider.html5Mode(true).hashPrefix('!');

  $logProvider.debugEnabled(true);

  $moment.locale('en', {
    week : {
      dow : 1, // Set Monday as first day of week
    },
  });

  const $window = $windowProvider.$get();
  advertising.defineAdSlots(DoubleClickProvider, $window);
};

export default config;
