import config from './index.config';
import routerConfig from './index.route';
import addConstants from './index.constants';

import runBlock from './index.run';

// filters
import capitalize from './common/filters/capitalize.js';
import downcase from './common/filters/downcase.js';
import hyphenate from './common/filters/hyphenate.js';
import upcase from './common/filters/upcase.js';

// resources
import Activity from './common/resources/activity.js';
import ActivityReview from './common/resources/activity-review.js';
import ActivityTrackerResponse from
  './common/resources/activity-tracker-response.js';
import Article from './common/resources/article.js';
import ArticleReview from './common/resources/article-review.js';
import CurrentUser from './common/resources/current-user.js';
import ExploreContent from './common/resources/explore-content.js';
import Game from './common/resources/game.js';
import GameReview from './common/resources/game-review.js';
import Pillar from './common/resources/pillar.js';
import Recipe from './common/resources/recipe.js';
import RecipeReview from './common/resources/recipe-review.js';
import RelatedContent from './common/resources/related-content.js';
import RelatedContentGames from './common/resources/related-content-games.js';
import UserActivity from './common/resources/user-activity.js';
import UserActivityPeriod from './common/resources/user-activity-period.js';
import UserArticle from './common/resources/user-article.js';
import UserGame from './common/resources/user-game.js';
import UserRecipe from './common/resources/user-recipe.js';

// presenters
import ActivityCardPresenter from
  './common/presenters/activity-card.presenter.js';
import ActivityPagePresenter from
  './common/presenters/activity-page.presenter.js';
import ArticleCardPresenter from
  './common/presenters/article-card.presenter.js';
import DefaultCardPresenter from
  './common/presenters/default-card.presenter.js';
import DefaultShowPagePresenter from
  './common/presenters/default-show-page.presenter.js';
import GameCardPresenter from
  './common/presenters/game-card.presenter.js';
import RecipeCardPresenter from './common/presenters/recipe-card.presenter.js';
import RecipePagePresenter from './common/presenters/recipe-page.presenter.js';

// services
import $auth from './common/services/auth.js';
import $assessmentsAuth from './assessments/assessments-auth.js';
import $currentModal from './common/services/current-modal.js';
import $loadCurrentUser from './common/services/load-current-user.js';
import $pagination from './common/services/pagination.js';
import $pillarFiltering from './common/services/pillar-filtering.js';
import $postHref from './common/services/post-href.js';
import $presenterUtils from './common/services/presenter-utils.js';
import authInterceptor from './common/services/auth-interceptor.js';
import dependentMemoize from './common/services/dependent-memoize.js';
import modalStateHelper from './common/services/modal-state-helper.js';

// directives
import activityTracker from './components/activity-tracker/activity-tracker.js';
import activityTrackerBinary from
  './components/activity-tracker/binary/binary.js';
import activityTrackerQuantity from
  './components/activity-tracker/quantity/quantity.js';
import card from './components/card/card.js';
import cards from './components/cards/cards.js';
import cardActivityTracker from
  './components/card-activity-tracker/card-activity-tracker.js';
import contentDrawer from './components/content-drawer/content-drawer.js';
import exploreContent from './components/explore-content/explore-content.js';
import infoBox from './components/info-box/info-box.js';
import modal from './components/modal/modal.js';
import navPanel from './components/nav-panel/nav-panel.js';
import navTabs from './components/nav-tabs/nav-tabs.js';
import pillarsDisplay from './components/pillars-display/pillars.js';
import pillarFilters from './components/pillar-filters/pillar-filters.js';
import pillarScores from './components/pillar-scores/pillar-scores.js';
import postHref from './common/directives/post-href.js';
import relatedContent from './components/related-content/related-content.js';
import reviews from './components/reviews/reviews.js';
import saveUserContent from
  './components/save-user-content/save-user-content.js';
import sideNav from './components/side-nav/side-nav.js';
import socialLinks from './components/social-links/social-links.js';
import topNav from './components/top-nav/top-nav.js';
import userDashboardCard from
  './components/user-dashboard-cards/user-dashboard-card.js';
import userDashboardCards from
  './components/user-dashboard-cards/user-dashboard-cards.js';

// controllers
import ActivityController from './activities/activity.controller.js';
import ActivityModalController from './activities/activity-modal.controller.js';
import ActivitiesController from './activities/activities.controller.js';
import ActivityTrackerController from
  './components/activity-tracker/activity-tracker.controller.js';
import ActivityTrackerBinaryController from
  './components/activity-tracker/binary/binary.controller.js';
import ActivityTrackerQuantityController from
  './components/activity-tracker/quantity/quantity.controller.js';
import ActivityTrackerQuantityEditPeriodController from
  './components/activity-tracker/quantity/edit-period.controller.js';
import ArticleController from './articles/article.controller.js';
import ArticleModalController from './articles/article-modal.controller.js';
import ArticlesController from './articles/articles.controller.js';
import AssessmentsController from './assessments/assessments.controller.js';
import CardController from './components/card/card.controller.js';
import CardActivityTrackerController from
  './components/card-activity-tracker/card-activity-tracker.controller.js';
import CardsController from './components/cards/cards.controller.js';
import ExploreContentController from
  './components/explore-content/explore-content.controller.js';
import GameController from './games/game.controller.js';
import GameModalController from './games/game-modal.controller.js';
import GamePlayController from './games/game-play.controller.js';
import GamesController from './games/games.controller.js';
import HomeController from './home/home.controller.js';
import LoginSuccessController from './callbacks/login-success.controller.js';
import LogoutController from './logout/logout.controller.js';
import NavPanelController from './components/nav-panel/nav-panel.controller.js';
import NavTabsController from './components/nav-tabs/nav-tabs.controller.js';
import PillarFiltersController from
  './components/pillar-filters/pillar-filters.controller.js';
import RecipeController from './recipes/recipe.controller.js';
import RecipeModalController from './recipes/recipe-modal.controller.js';
import RecipesController from './recipes/recipes.controller.js';
import RelatedContentController from
  './components/related-content/related-content.controller.js';
import ReviewsController from './components/reviews/reviews.controller.js';
import SaveUserContentController from
  './components/save-user-content/save-user-content.controller.js';
import SocialLinksController from
  './components/social-links/social-links.controller.js';
import TopNavController from './components/top-nav/top-nav.controller.js';
import UserDashboardCardController from
  './components/user-dashboard-cards/user-dashboard-card.controller.js';
import UserDashboardCardsController from
  './components/user-dashboard-cards/user-dashboard-cards.controller.js';
import UserDashboardController from './me/working-on/user-dashboard.controller.js';
import UserArticleController from './me/articles/user-article.controller.js';
import UserArticlesController from './me/articles/user-articles.controller.js';
import UserGameController from './me/games/user-game.controller.js';
import UserGamesController from './me/games/user-games.controller.js';
import UserRecipeController from './me/recipes/user-recipe.controller.js';
import UserRecipesController from './me/recipes/user-recipes.controller.js';
import PillarScoresController from
  './components/pillar-scores/pillar-scores.controller.js';

const app = angular.module('aarp-staying-sharp', [
  'angularModalService',
  'pascalprecht.translate', // aka angular-translate
  'ngAnimate',
  'ngSanitize',
  'ngStorage',
  'rails', // aka angular-rails-resource
  'ui.router',
  'ui.router.stateHelper',
  'ui.select',
  '720kb.socialshare',
]);

addConstants(app);

app
  .config(config)
  .config(routerConfig)

  .run(runBlock)

  // filters

  .filter('capitalize', capitalize)
  .filter('downcase', downcase)
  .filter('hyphenate', hyphenate)
  .filter('upcase', upcase)

  // resources
  .factory('Activity', Activity)
  .factory('ActivityReview', ActivityReview)
  .factory('ActivityTrackerResponse', ActivityTrackerResponse)
  .factory('Article', Article)
  .factory('ArticleReview', ArticleReview)
  .factory('CurrentUser', CurrentUser)
  .factory('ExploreContent', ExploreContent)
  .factory('Game', Game)
  .factory('GameReview', GameReview)
  .factory('Pillar', Pillar)
  .factory('Recipe', Recipe)
  .factory('RecipeReview', RecipeReview)
  .factory('RelatedContent', RelatedContent)
  .factory('RelatedContentGames', RelatedContentGames)
  .factory('UserActivity', UserActivity)
  .factory('UserActivityPeriod', UserActivityPeriod)
  .factory('UserArticle', UserArticle)
  .factory('UserGame', UserGame)
  .factory('UserRecipe', UserRecipe)

  // presenters
  .factory('ActivityCardPresenter', ActivityCardPresenter)
  .factory('ActivityPagePresenter', ActivityPagePresenter)
  .factory('ArticleCardPresenter', ArticleCardPresenter)
  .factory('DefaultCardPresenter', DefaultCardPresenter)
  .factory('DefaultShowPagePresenter', DefaultShowPagePresenter)
  .factory('GameCardPresenter', GameCardPresenter)
  .factory('RecipeCardPresenter', RecipeCardPresenter)
  .factory('RecipePagePresenter', RecipePagePresenter)

  // services
  .factory('$assessmentsAuth', $assessmentsAuth)
  .factory('$auth', $auth)
  .factory('$currentModal', $currentModal)
  .factory('$loadCurrentUser', $loadCurrentUser)
  .factory('$pagination', $pagination)
  .factory('$pillarFiltering', $pillarFiltering)
  .factory('$postHref', $postHref)
  .factory('$presenterUtils', $presenterUtils)
  .factory('authInterceptor', authInterceptor)
  .factory('dependentMemoize', dependentMemoize)
  .provider('modalStateHelper', modalStateHelper)

  // directives
  .directive('ssActivityTracker', activityTracker)
  .directive('ssActivityTrackerBinary', activityTrackerBinary)
  .directive('ssActivityTrackerQuantity', activityTrackerQuantity)
  .directive('ssCard', card)
  .directive('ssCardActivityTracker', cardActivityTracker)
  .directive('ssCards', cards)
  .directive('ssContentDrawer', contentDrawer)
  .directive('ssExploreContent', exploreContent)
  .directive('ssInfoBox', infoBox)
  .directive('ssModal', modal)
  .directive('ssNavTabs', navTabs)
  .directive('ssNavPanel', navPanel)
  .directive('ssPillarsDisplay', pillarsDisplay)
  .directive('ssPillarFilters', pillarFilters)
  .directive('ssPillarScores', pillarScores)
  .directive('ssPostHref', postHref)
  .directive('ssRelatedContent', relatedContent)
  .directive('ssReviews', reviews)
  .directive('ssSaveUserContent', saveUserContent)
  .directive('ssSocialLinks', socialLinks)
  .directive('ssSideNav', sideNav)
  .directive('ssTopNav', topNav)
  .directive('ssUserDashboardCard', userDashboardCard)
  .directive('ssUserDashboardCards', userDashboardCards)

  // controllers
  .controller('ActivityController', ActivityController)
  .controller('ActivityModalController', ActivityModalController)
  .controller('ActivitiesController', ActivitiesController)
  .controller('ActivityTrackerController', ActivityTrackerController)
  .controller('ActivityTrackerBinaryController',
    ActivityTrackerBinaryController)
  .controller('ActivityTrackerQuantityController',
    ActivityTrackerQuantityController)
  .controller('ActivityTrackerQuantityEditPeriodController',
    ActivityTrackerQuantityEditPeriodController)
  .controller('ArticleController', ArticleController)
  .controller('ArticleModalController', ArticleModalController)
  .controller('ArticlesController', ArticlesController)
  .controller('AssessmentsController', AssessmentsController)
  .controller('CardController', CardController)
  .controller('CardActivityTrackerController', CardActivityTrackerController)
  .controller('CardsController', CardsController)
  .controller('ExploreContentController', ExploreContentController)
  .controller('GameController', GameController)
  .controller('GameModalController', GameModalController)
  .controller('GamePlayController', GamePlayController)
  .controller('GamesController', GamesController)
  .controller('HomeController', HomeController)
  .controller('LoginSuccessController', LoginSuccessController)
  .controller('LogoutController', LogoutController)
  .controller('NavPanelController', NavPanelController)
  .controller('PillarScoresController', PillarScoresController)
  .controller('PillarFiltersController', PillarFiltersController)
  .controller('RecipeController', RecipeController)
  .controller('RecipeModalController', RecipeModalController)
  .controller('RecipesController', RecipesController)
  .controller('RelatedContentController', RelatedContentController)
  .controller('ReviewsController', ReviewsController)
  .controller('SaveUserContentController', SaveUserContentController)
  .controller('SocialLinksController', SocialLinksController)
  .controller('TopNavController', TopNavController)
  .controller('NavTabsController', NavTabsController)
  .controller('UserDashboardCardController', UserDashboardCardController)
  .controller('UserDashboardCardsController', UserDashboardCardsController)
  .controller('UserDashboardController', UserDashboardController)
  .controller('UserArticleController', UserArticleController)
  .controller('UserArticlesController', UserArticlesController)
  .controller('UserGameController', UserGameController)
  .controller('UserGamesController', UserGamesController)
  .controller('UserRecipeController', UserRecipeController)
  .controller('UserRecipesController', UserRecipesController);
