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
            modalStateHelperProvider({
              name: 'article-share',
              templateUrl: 'app/components/share-modal/share-modal.html',
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
        },
        {
          name: 'assessment',
          url: '/assessment',
          template: '<div ui-view></div>',
          // TODO: come up with a better solution for the static instructions
          children: [
            {
              name: 'choice-reaction-time',
              url: '/74',
              templateUrl: 'app/assessments/mbs/choice-reaction-time.html',
              controller: 'AssessmentController',
              controllerAs: 'vm',
            },
            {
              name: 'continuous-performance',
              url: '/79',
              templateUrl: 'app/assessments/mbs/continuous-performance.html',
              controller: 'AssessmentController',
              controllerAs: 'vm',
            },
            {
              name: 'digit-span',
              url: '/27',
              templateUrl: 'app/assessments/mbs/digit-span.html',
              controller: 'AssessmentController',
              controllerAs: 'vm',
            },
            {
              name: 'executive-function',
              url: '/66',
              templateUrl: 'app/assessments/mbs/executive-function.html',
              controller: 'AssessmentController',
              controllerAs: 'vm',
            },
            {
              name: 'go-nogo',
              url: '/go-nogo',
              templateUrl: 'app/assessments/mbs/go-nogo.html',
              controller: 'AssessmentController',
              controllerAs: 'vm',
            },
            {
              name: 'category-recognition-delayed',
              url: '/76',
              templateUrl:
                'app/assessments/mbs/category-recognition-delayed.html',
              controller: 'AssessmentController',
              controllerAs: 'vm',
            },
            {
              name: 'category-recognition',
              url: '/75',
              templateUrl: 'app/assessments/mbs/category-recognition.html',
              controller: 'AssessmentController',
              controllerAs: 'vm',
            },
            {
              name: 'motor-tapping',
              url: '/motor-tapping',
              templateUrl: 'app/assessments/mbs/motor-tapping.html',
              controller: 'AssessmentController',
              controllerAs: 'vm',
            },
            {
              name: 'switching-of-attention',
              url: '/57',
              templateUrl: 'app/assessments/mbs/switching-of-attention.html',
              controller: 'AssessmentController',
              controllerAs: 'vm',
            },
            {
              name: 'verbal-interference',
              url: '/verbal-interference',
              templateUrl: 'app/assessments/mbs/verbal-interference.html',
              controller: 'AssessmentController',
              controllerAs: 'vm',
            },
            {
              name: 'verbal-memory',
              url: '/75',
              templateUrl: 'app/assessments/mbs/verbal-interference.html',
              controller: 'AssessmentController',
              controllerAs: 'vm',
            },
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
          name: 'assessments-results',
          url: '/assessments-results',
          templateUrl: 'app/assessments/assessments-results.html',
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
            modalStateHelperProvider({
              name: 'recipe-share',
              templateUrl: 'app/components/share-modal/share-modal.html',
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
        },
        {
          name: 'static',
          url: '/',
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
              children: [
                modalStateHelperProvider({
                  name: 'article-share',
                  templateUrl: 'app/components/share-modal/share-modal.html',
                  controller: 'ArticleModalController',
                  controllerAs: 'vm',
                }),
              ],
            },
            {
              name: 'articles',
              url: '/articles',
              templateUrl: 'app/me/articles/user-articles.html',
              controller: 'UserArticlesController',
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
            },
            {
              name: 'recipe',
              url: '/recipes/:id',
              templateUrl: 'app/recipes/recipe.html',
              controller: 'UserRecipeController',
              controllerAs: 'vm',
              children: [
                modalStateHelperProvider({
                  name: 'recipe-share',
                  templateUrl: 'app/components/share-modal/share-modal.html',
                  controller: 'RecipeModalController',
                  controllerAs: 'vm',
                }),
              ],
            },
            {
              name: 'recipes',
              url: '/recipes',
              templateUrl: 'app/me/recipes/user-recipes.html',
              controller: 'UserRecipesController',
              controllerAs: 'vm',
            },
            {
              name: 'working-on',
              url: '/working-on',
              templateUrl: 'app/me/working-on/user-dashboard.html',
              controller: 'UserDashboardController',
              controllerAs: 'vm',
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
