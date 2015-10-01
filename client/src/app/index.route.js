var routerConfig = function (stateHelperProvider,
                             modalStateHelperProvider,
                             $urlRouterProvider) {
  'ngInject';

  stateHelperProvider
    .state({
      name: 'application',
      templateUrl: 'app/layouts/application.html',
      children: [
        {
          name: 'home',
          url: '/',
          templateUrl: 'app/home/home.html',
          controller: 'HomeController',
          controllerAs: 'vm',
        },
        {
          name: 'login-failure',
          url: '/callbacks/login-failure',
          templateUrl: 'app/login-failure/login-failure.html',
        },
      ],
    })
    .state({
      name: 'login-success',
      url: '/callbacks/login-success/:claimToken',
      controller: 'LoginSuccessController',
    });

  $urlRouterProvider.otherwise('/');
};

export default routerConfig;
