const routerConfig = function (stateHelperProvider,
                               modalStateHelperProvider,
                               $urlRouterProvider) {
  'ngInject';

  stateHelperProvider
    .state({
      name: 'application',
      templateUrl: 'app/layouts/application.html',
      children: [
        {
          name: 'articles',
          url: '/articles',
          templateUrl: 'app/articles/articles.html',
          controller: 'ArticlesController',
          controllerAs: 'vm',
        },
        {
          name: 'articles-detail',
          url: '/articles/:id',
          templateUrl: 'app/articles/articles-detail.html',
          controller: 'ArticlesDetailController',
          controllerAs: 'vm',
          children: [
            modalStateHelperProvider({
              name: 'article-saved',
              templateUrl: 'app/articles/article-saved-modal.html',
              controller: 'ArticleSavedController',
              controllerAs: 'vm',
            }),
          ],
        },
        {
          name: 'home',
          url: '/',
          templateUrl: 'app/home/home.html',
          controller: 'HomeController',
          controllerAs: 'vm',
        },
        {
          name: 'recipes',
          url: '/recipes',
          templateUrl: 'app/recipes/recipes.html',
          controller: 'RecipesController',
          controllerAs: 'vm',
        },
        {
          name: 'login-failure',
          url: '/callbacks/login-failure',
          templateUrl: 'app/login-failure/login-failure.html',
        },
        {
          name: 'user',
          url: '/me',
          template: '<div ui-view></div>',
          children: [
            {
              name: 'articles',
              url: '/articles',
              templateUrl: 'app/articles/articles.html',
              controller: 'UserArticlesController',
              controllerAs: 'vm',
            },
          ],
        },
      ],
    })
    .state({
      name: 'login-success',
      url: '/callbacks/login-success/:claimToken',
      controller: 'LoginSuccessController',
    })
    .state({
      name: 'logout',
      url: '/logout',
      controller: 'LogoutController',
    });

  $urlRouterProvider.otherwise('/');
};

export default routerConfig;
