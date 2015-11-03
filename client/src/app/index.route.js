const routerConfig = function (stateHelperProvider,
                               modalStateHelperProvider,
                               $urlRouterProvider) {
  'ngInject';

  const previousState = function ($state) {
    return {
      name: $state.current.name,
      params: $state.params,
      url: $state.href($state.current.name, $state.params),
    };
  };

  stateHelperProvider
    .state({
      name: 'application',
      templateUrl: 'app/layouts/application.html',
      // NOTE: can access current user in the controller using currentUser
      // or $rootsScope.$currentUser
      resolve: {
        currentUser: function ($loadCurrentUser) {
          return $loadCurrentUser();
        },
      },
      children: [
        {
          name: 'activities',
          url: '/activities',
          templateUrl: 'app/activities/activities.html',
          controller: 'ActivitiesController',
          controllerAs: 'vm',
        },
        {
          name: 'articles',
          url: '/articles',
          templateUrl: 'app/articles/articles.html',
          controller: 'ArticlesController',
          controllerAs: 'vm',
        },
        {
          name: 'article',
          url: '/article/:id',
          templateUrl: 'app/articles/article.html',
          controller: 'ArticleController',
          controllerAs: 'vm',
          children: [
            modalStateHelperProvider({
              name: 'article-saved',
              templateUrl: 'app/articles/article-saved-modal.html',
              controller: 'ArticleModalController',
              controllerAs: 'vm',
            }),
            modalStateHelperProvider({
              name: 'article-share',
              templateUrl: 'app/articles/article-share-modal.html',
              controller: 'ArticleModalController',
              controllerAs: 'vm',
            }),
          ],
        },
        {
          name: 'assessments',
          url: '/assessments',
          controller: 'AssessmentsController',
          controllerAs: 'vm',
          templateUrl: 'app/assessments/assessments.html',
        },
        {
          name: 'assessment',
          url: '/assessment/:id',
          templateUrl: 'app/assessments/assessment.html',
        },
        {
          name: 'games',
          url: '/games',
          templateUrl: 'app/games/games.html',
          controller: 'GamesController',
          controllerAs: 'vm',
        },
        {
          name: 'game',
          url: '/game/:id',
          templateUrl: 'app/games/game.html',
          controller: 'GameController',
          controllerAs: 'vm',
          children: [
            modalStateHelperProvider({
              name: 'game-saved',
              templateUrl: 'app/games/game-saved-modal.html',
              controller: 'GameModalController',
              controllerAs: 'vm',
            }),
          ],
        },
        {
          name: 'game-play',
          url: '/game-play/:id',
          templateUrl: 'app/games/game-play.html',
          controller: 'GamePlayController',
          controllerAs: 'vm',
          resolve: { previousState },
        },
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
        {
          name: 'recipe',
          url: '/recipe/:id',
          templateUrl: 'app/recipes/recipe.html',
          controller: 'RecipeController',
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
          name: 'user',
          url: '/me',
          template: '<div ui-view></div>',
          children: [
            {
              name: 'articles',
              url: '/articles',
              templateUrl: 'app/me/articles/user-articles.html',
              controller: 'UserArticlesController',
              controllerAs: 'vm',
            },
            {
              name: 'article',
              url: '/article/:id',
              templateUrl: 'app/articles/article.html',
              controller: 'UserArticleController',
              controllerAs: 'vm',
              children: [
                modalStateHelperProvider({
                  name: 'article-share',
                  templateUrl: 'app/articles/article-share-modal.html',
                  controller: 'ArticleModalController',
                  controllerAs: 'vm',
                }),
              ],
            },
            {
              name: 'games',
              url: '/games',
              templateUrl: 'app/me/games/user-games.html',
              controller: 'UserGamesController',
              controllerAs: 'vm',
            },
            {
              name: 'game',
              url: '/game/:id',
              templateUrl: 'app/games/game.html',
              controller: 'UserGameController',
              controllerAs: 'vm',
            },
          ],
        },
        {
          name: 'login-success',
          url: '/callbacks/login-success/:claimToken',
          controller: 'LoginSuccessController',
        },
      ],
    })
    .state({
      name: 'logout',
      url: '/logout',
      controller: 'LogoutController',
    });

  $urlRouterProvider.otherwise('/');
};

export default routerConfig;
