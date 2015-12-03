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

  const pillarFilterModal = function () {
    return modalStateHelperProvider({
      name: 'pillar-info',
      templateUrl: 'app/components/pillar-filters/pillar-info-modal.html',
      controller: 'PillarInfoModalController',
      controllerAs: 'vm',
    });
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
          name: 'activity',
          url: '/activities/:id',
          templateUrl: 'app/activities/activity.html',
          controller: 'ActivityController',
          controllerAs: 'vm',
          children: [
            modalStateHelperProvider({
              name: 'activity-saved',
              templateUrl: 'app/components/saved-modal/saved-modal.html',
              controller: 'ActivityModalController',
              controllerAs: 'vm',
            }),
            modalStateHelperProvider({
              name: 'activity-save-failed',
              templateUrl: 'app/activities/activity-save-failed-modal.html',
              controller: 'ActivityModalController',
              controllerAs: 'vm',
            }),
          ],
        },
        {
          name: 'activities',
          url: '/activities',
          templateUrl: 'app/activities/activities.html',
          controller: 'ActivitiesController',
          controllerAs: 'vm',
          children: [
            pillarFilterModal(),
          ],
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
              templateUrl: 'app/components/saved-modal/saved-modal.html',
              controller: 'ArticleModalController',
              controllerAs: 'vm',
            }),
          ],
        },
        {
          name: 'articles',
          url: '/articles',
          templateUrl: 'app/articles/articles.html',
          controller: 'ArticlesController',
          controllerAs: 'vm',
          children: [
            pillarFilterModal(),
          ],
        },
        {
          name: 'assessments-callback',
          url: '/assessments-callback',
          controller: 'AssessmentsCallbackController',
          controllerAs: 'vm',
        },
        {
          name: 'assessments-questionnaire',
          url: '/assessment/:id',
          controller: 'AssessmentController',
          controllerAs: 'vm',
          templateUrl: 'app/assessments/assessment.html',
        },
        {
          name: 'assessments',
          url: '/assessments',
          controller: 'AssessmentsController',
          controllerAs: 'vm',
          templateUrl: 'app/assessments/assessments.html',
        },
        {
          name: 'assessment-results',
          url: '/assessment-results',
          template: '<div ui-view></div>',
          children: [
            {
              name: 'overall',
              url: '/overall',
              templateUrl: 'app/assessments/results/overall.html',
              controller: 'OverallResultsController',
              controllerAs: 'vm',
            },
            {
              name: 'neuroperformance',
              url: '/neuroperformance',
              templateUrl: 'app/assessments/results/neuroperformance.html',
              controller: 'NeuroPerformanceController',
              controllerAs: 'vm',
            },
          ],
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
              templateUrl: 'app/components/saved-modal/saved-modal.html',
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
          name: 'games',
          url: '/games',
          templateUrl: 'app/games/games.html',
          controller: 'GamesController',
          controllerAs: 'vm',
          children: [
            pillarFilterModal(),
          ],
        },
        {
          name: 'home',
          url: '/',
          templateUrl: 'app/home/home.html',
          controller: 'HomeController',
          controllerAs: 'vm',
          children: [
            pillarFilterModal(),
          ],
        },
        {
          name: 'login-failure',
          url: '/callbacks/login-failure',
          templateUrl: 'app/login-failure/login-failure.html',
        },
        {
          name: 'login-success',
          url: '/callbacks/login-success/:claimToken',
          controller: 'LoginSuccessController',
        },
        {
          name: 'recipe',
          url: '/recipes/:id',
          templateUrl: 'app/recipes/recipe.html',
          controller: 'RecipeController',
          controllerAs: 'vm',
          children: [
            modalStateHelperProvider({
              name: 'recipe-saved',
              templateUrl: 'app/components/saved-modal/saved-modal.html',
              controller: 'RecipeModalController',
              controllerAs: 'vm',
            }),
          ],
        },
        {
          name: 'recipes',
          url: '/recipes',
          templateUrl: 'app/recipes/recipes.html',
          controller: 'RecipesController',
          controllerAs: 'vm',
          children: [
            pillarFilterModal(),
          ],
        },
        {
          name: 'static',
          url: '',
          template: '<div ui-view></div>',
          children: [
            {
              name: 'faq',
              url: '/faq',
              templateUrl: 'app/static/faq.html',
            },
            {
              name: 'privacy-policy',
              url: '/privacy-policy',
              templateUrl: 'app/static/privacy-policy.html',
            },
            {
              name: 'terms-of-service',
              url: '/terms-of-service',
              templateUrl: 'app/static/terms-of-service.html',
            },
          ],
        },
        {
          name: 'user',
          url: '/me',
          templateUrl: 'app/layouts/user.html',
          children: [
            {
              name: 'article',
              url: '/articles/:id',
              templateUrl: 'app/articles/article.html',
              controller: 'UserArticleController',
              controllerAs: 'vm',
            },
            {
              name: 'articles',
              url: '/articles',
              templateUrl: 'app/me/articles/user-articles.html',
              controller: 'UserArticlesController',
              controllerAs: 'vm',
              children: [
                pillarFilterModal(),
              ],
            },
            {
              name: 'assessments',
              url: '/assessments',
              templateUrl: 'app/me/assessments/user-assessments.html',
              controller: 'UserAssessmentsController',
              controllerAs: 'vm',
            },
            {
              name: 'game',
              url: '/game/:id',
              templateUrl: 'app/games/game.html',
              controller: 'UserGameController',
              controllerAs: 'vm',
            },
            {
              name: 'games',
              url: '/games',
              templateUrl: 'app/me/games/user-games.html',
              controller: 'UserGamesController',
              controllerAs: 'vm',
              children: [
                pillarFilterModal(),
              ],
            },
            {
              name: 'recipe',
              url: '/recipes/:id',
              templateUrl: 'app/recipes/recipe.html',
              controller: 'UserRecipeController',
              controllerAs: 'vm',
            },
            {
              name: 'recipes',
              url: '/recipes',
              templateUrl: 'app/me/recipes/user-recipes.html',
              controller: 'UserRecipesController',
              controllerAs: 'vm',
              children: [
                pillarFilterModal(),
              ],
            },
            {
              name: 'working-on',
              url: '/working-on',
              templateUrl: 'app/me/working-on/user-dashboard.html',
              controller: 'UserDashboardController',
              controllerAs: 'vm',
              children: [
                pillarFilterModal(),
              ],
            },
          ],
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
