var routerConfig = function (stateHelperProvider, $urlRouterProvider) {
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
      ],
    })
    .state({
      name: 'articles',
      url: '/articles',
      templateUrl: 'app/articles/articles.html',
      controller: 'ArticlesController',
      controllerAs: 'vm',
    });

  $urlRouterProvider.otherwise('/');
};

export default routerConfig;
