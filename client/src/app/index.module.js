import config from './index.config';
import routerConfig from './index.route';
import addConstants from './index.constants';

import runBlock from './index.run';

// filters
import capitalize from './common/filters/capitalize.js';
import downcase from './common/filters/downcase.js';
import hyphenate from './common/filters/hyphenate.js';
import startcase from './common/filters/startcase.js';
import upcase from './common/filters/upcase.js';

// resources
import Activity from './common/resources/activity.js';
import ActivityReview from './common/resources/activity-review.js';
import ActivityTrackerResponse from
  './common/resources/activity-tracker-response.js';
import Article from './common/resources/article.js';
import ArticleReview from './common/resources/article-review.js';
import Assessment from './common/resources/assessment.js';
import AssessmentResponse from './common/resources/assessment-response.js';
import AssessmentResultCategory from
  './common/resources/assessment-result-category';
import CurrentUser from './common/resources/current-user.js';
import CurrentUserPolicy from './common/resources/current-user-policy.js';
import ExploreContent from './common/resources/explore-content.js';
import Game from './common/resources/game.js';
import FreeGame from './common/resources/free-game.js';
import GameReview from './common/resources/game-review.js';
import LifestyleResult from'./common/resources/lifestyle-result.js';
import NeuroPerformanceResult from
  './common/resources/neuro-performance-result.js';
import Pillar from './common/resources/pillar.js';
import Recipe from './common/resources/recipe.js';
import RecipeReview from './common/resources/recipe-review.js';
import RecommendedContent from './common/resources/recommended-content.js';
import RelatedContent from './common/resources/related-content.js';
import RelatedContentGames from './common/resources/related-content-games.js';
import Search from './common/resources/search.js';
import SitemapUrl from './common/resources/sitemap-url.js';
import UserActivity from './common/resources/user-activity.js';
import UserArchivedActivity from './common/resources/user-archived-activity.js';
import UserActivityPeriod from './common/resources/user-activity-period.js';
import UserArticle from './common/resources/user-article.js';
import UserAssessmentGroup from './common/resources/user-assessment-group.js';
import UserAssessment from './common/resources/user-assessment.js';
import UserGame from './common/resources/user-game.js';
import UserInfo from './common/resources/user-info.js';
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
import UserActivityCardPresenter from
  './common/presenters/user-activity-card.presenter.js';

// services
import $auth from './common/services/auth.js';
import $assessmentsAuth from './assessments/assessments-auth.js';
import $assessmentResults from './common/services/assessment-results.js';
import $currentModal from './common/services/current-modal.js';
import $featureDetection from './common/services/feature-detection.js';
import $gamesAuth from './games/games-auth';
import $loadCurrentUser from './common/services/load-current-user.js';
import $pagination from './common/services/pagination.js';
import $pillarFiltering from './common/services/pillar-filtering.js';
import $postHref from './common/services/post-href.js';
import $presenterUtils from './common/services/presenter-utils.js';
import $promise from './common/services/promise.js';
import $redirectContent from './common/services/redirect-content.js';
import $url from './common/services/url.js';
import $vanityUrlCheck from './common/services/vanity-url-check.js';
import $windowResize from './common/services/window-resize.js';
import Airbrake from './common/services/airbrake.js';
import AssessmentStatus from './assessments/assessment-status.js';
import ActivityPeriodActions
  from './common/services/activity-period-actions.js';
import AssessmentResultQueries from './assessments/results/queries.js';
import AssessmentResultScores from './assessments/results/scores.js';
import assessmentLinkManager from
  './common/services/assessment-link-manager.js';
import assessmentStates from
  './assessments/assessment-engagement-states.js';
import authInterceptor from './common/services/auth-interceptor.js';
import dependentMemoize from './common/services/dependent-memoize.js';
import dsoAuth from './common/services/dso-auth.js';
import dtmAnalyticsService from
  './common/services/dtm-analytics-service.js';
import FutureBrainStats from './components/charts/future-brain-stats.js';
import httpsInterceptor from './common/services/https-interceptor.js';
import MBSAssessmentList from './assessments/mbs-assessment-list.js';
import modalStateHelper from './common/services/modal-state-helper.js';
import PerformSearch from './search/perform-search.js';
import presenterDispatch from './common/services/presenter-dispatch.js';
import dsoModalService from
  './common/services/dso-modal-service.js';
import userPolicies from './common/services/user-policies.js';
import restrictedRedirectService from
  './common/services/restricted-redirect-service.js';
import resourceUrlFormatter from './common/services/resource-url-formatter.js';

// directives
import activityTracker from './components/activity-tracker/activity-tracker.js';
import activityTrackerBinary from
  './components/activity-tracker/binary/binary.js';
import activityTrackerQuantity from
  './components/activity-tracker/quantity/quantity.js';
import assessmentButton from
  './assessments/assessment-button/assessment-button.js';
import autoRedirect from './common/directives/auto-redirect.js';
import card from './components/card/card.js';
import cards from './components/cards/cards.js';
import cardActivityTracker from
  './components/card-activity-tracker/card-activity-tracker.js';
import collectionCard from './components/collection-card/collection-card.js';
import contentDrawer from './components/content-drawer/content-drawer.js';
import currentLifestyleResultsChart from
  './components/charts/current-lifestyle-results.chart.js';
import currentNeuroResultsChart from
  './components/charts/current-neuro-results.chart.js';
import encouragementMessage from
  './components/encouragement-message/encouragement-message.js';
import gameIframe from './games/game-iframe.js';
import infoBox from './components/info-box/info-box.js';
import leadIn from './components/lead-in/lead-in.js';
import mastHeadAd from './components/ads/mast-head-ad/mast-head-ad.js';
import modal from './components/modal/modal.js';
import myFutureBrainChart from './components/charts/my-future-brain.chart.js';
import navPanel from './components/nav-panel/nav-panel.js';
import navTabs from './components/nav-tabs/nav-tabs.js';
import onetimeAd from './components/onetime-ad/onetime-ad.js';
import pillarsDisplay from './components/pillars-display/pillars.js';
import pillarFilters from './components/pillar-filters/pillar-filters.js';
import pillarScores from './components/pillar-scores/pillar-scores.js';
import postHref from './common/directives/post-href.js';
import resultIndexChart from './components/charts/result-index.chart.js';
import resultSection from './components/assessment-results/result-section.js';
import relatedContent from './components/related-content/related-content.js';
import reviews from './components/reviews/reviews.js';
import saveUserContent from
  './components/save-user-content/save-user-content.js';
import sideNav from './components/side-nav/side-nav.js';
import socialLinks from './components/social-links/social-links.js';
import squareAd from './components/ads/square-ad/square-ad.js';
import systemMessage from './components/system-message/system-message.js';
import topNav from './components/top-nav/top-nav.js';
import updateMeta from './components/update-meta/update-meta.js';
import userDashboardCard from
  './components/user-dashboard-cards/user-dashboard-card.js';
import userDashboardCards from
  './components/user-dashboard-cards/user-dashboard-cards.js';
import videoIframe from './articles/video-iframe/video-iframe.js';

// controllers
import ActivityArchiveModalController from
  './components/archived-modal/activity-archive-modal.controller.js';
import ActivityArchiveSuccessModalController from
  './components/archived-modal/activity-archive-success-modal.controller.js';
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
import AssessmentController from './assessments/assessment.controller.js';
import AssessmentsController from './assessments/assessments.controller.js';
import AssessmentsCallbackController from
  './assessments/assessments-callback.controller.js';
import AssessmentButtonController from
  './assessments/assessment-button/assessment-button.controller.js';
import AssessmentCompletionController from
  './assessments/assessment-completion.controller.js';
import CardController from './components/card/card.controller.js';
import CardActivityTrackerController from
  './components/card-activity-tracker/card-activity-tracker.controller.js';
import CardsController from './components/cards/cards.controller.js';
import CollectionCardController from
  './components/collection-card/collection-card.controller.js';
import CurrentLifestyleResultsController from
  './components/charts/current-lifestyle-results.controller.js';
import CurrentNeuroResultsController from
  './components/charts/current-neuro-results.controller.js';
import DsoModalController from
'./components/dso-modal/dso-modal.controller.js';
import DsoGenericMocalController from
'./components/dso-modal/dso-generic-modal.controller.js';
import EncouragementMessageController from
  './components/encouragement-message/encouragement-message.controller.js';
import GameController from './games/game.controller.js';
import GameIframeController from './games/game-iframe.controller.js';
import GameIframeContentController
  from './game-iframe/game-iframe-content.controller.js';
import GameModalController from './games/game-modal.controller.js';
import GamePlayController from './games/game-play.controller.js';
import GamesController from './games/games.controller.js';
import HomeController from './home/home.controller.js';
import LoginSuccessController from './callbacks/login-success.controller.js';
import LogoutController from './logout/logout.controller.js';
import MyFutureBrainController from
  './components/charts/my-future-brain.controller.js';
import NavPanelController from './components/nav-panel/nav-panel.controller.js';
import NeuroPerformanceController from
  './assessments/results/neuroperformance.controller.js';
import OverallResultsController from
  './assessments/results/overall-results.controller.js';
import PillarFiltersController from
  './components/pillar-filters/pillar-filters.controller.js';
import PillarInfoModalController from
  './components/pillar-filters/pillar-info-modal.controller.js';
import RecipeController from './recipes/recipe.controller.js';
import RecipeModalController from './recipes/recipe-modal.controller.js';
import RecipesController from './recipes/recipes.controller.js';
import RelatedContentController from
  './components/related-content/related-content.controller.js';
import ResultSectionController from
  './components/assessment-results/result-section.controller.js';
import ResultIndexController from
  './components/charts/result-index.controller.js';
import RetakeAssessmentModalController from
  './assessments/retake-assessment-modal.controller.js';
import ReviewsController from './components/reviews/reviews.controller.js';
import RequiredTechnologyController from
  './assessments/required-technology.controller.js';
import SaveUserContentController from
  './components/save-user-content/save-user-content.controller.js';
import SearchResultsController from
  './search/search-results.controller.js';
import SitemapController from './sitemap/sitemap.controller.js';
import SitemapDataController from './sitemap/sitemap-data.controller.js';
import SocialLinksController from
  './components/social-links/social-links.controller.js';
import StaticController from './static/static.controller.js';
import SystemMessageController from
  './components/system-message/system-message.controller.js';
import TopNavController from './components/top-nav/top-nav.controller.js';
import UserDashboardCardController from
  './components/user-dashboard-cards/user-dashboard-card.controller.js';
import UserDashboardCardsController from
  './components/user-dashboard-cards/user-dashboard-cards.controller.js';
import UserDashboardController from
  './me/working-on/user-dashboard.controller.js';
import UpdateMetaController from
  './components/update-meta/update-meta.controller.js';
import UserArchiveController from './me/archive/user-archive.controller.js';
import UserArticleController from './me/articles/user-article.controller.js';
import UserArticlesController from './me/articles/user-articles.controller.js';
import UserAssessmentsController from
  './me/assessments/user-assessments.controller.js';
import UserGameController from './me/games/user-game.controller.js';
import UserGamesController from './me/games/user-games.controller.js';
import UserRecipeController from './me/recipes/user-recipe.controller.js';
import UserRecipesController from './me/recipes/user-recipes.controller.js';
import PillarScoresController from
  './components/pillar-scores/pillar-scores.controller.js';
import VideoIframeController from
  './articles/video-iframe/video-iframe.controller.js';

const app = angular.module('aarp-staying-sharp', [
  'angularModalService',
  'pascalprecht.translate', // aka angular-translate
  'highcharts-ng',
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ngStorage',
  'rails', // aka angular-rails-resource
  'permission',
  'ui.router',
  'ui.router.stateHelper',
  'ui.select',
  '720kb.socialshare',
  'ngComboDatePicker',
  'angularUtils.directives.dirPagination',
  'infinite-scroll',
  'updateMeta',
  'angular-cache',
]);
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);

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
  .filter('startcase', startcase)

  // resources
  .factory('Activity', Activity)
  .factory('ActivityReview', ActivityReview)
  .factory('ActivityTrackerResponse', ActivityTrackerResponse)
  .factory('Article', Article)
  .factory('ArticleReview', ArticleReview)
  .factory('Assessment', Assessment)
  .factory('AssessmentResponse', AssessmentResponse)
  .factory('AssessmentResultCategory', AssessmentResultCategory)
  .factory('CurrentUser', CurrentUser)
  .factory('CurrentUserPolicy', CurrentUserPolicy)
  .factory('ExploreContent', ExploreContent)
  .factory('Game', Game)
  .factory('FreeGame', FreeGame)
  .factory('GameReview', GameReview)
  .factory('LifestyleResult', LifestyleResult)
  .factory('NeuroPerformanceResult', NeuroPerformanceResult)
  .factory('Pillar', Pillar)
  .factory('Recipe', Recipe)
  .factory('RecipeReview', RecipeReview)
  .factory('RecommendedContent', RecommendedContent)
  .factory('RelatedContent', RelatedContent)
  .factory('RelatedContentGames', RelatedContentGames)
  .factory('Search', Search)
  .factory('SitemapUrl', SitemapUrl)
  .factory('UserActivity', UserActivity)
  .factory('UserArchivedActivity', UserArchivedActivity)
  .factory('UserActivityPeriod', UserActivityPeriod)
  .factory('UserArticle', UserArticle)
  .factory('UserAssessmentGroup', UserAssessmentGroup)
  .factory('UserAssessment', UserAssessment)
  .factory('UserGame', UserGame)
  .factory('UserInfo', UserInfo)
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
  .factory('UserActivityCardPresenter', UserActivityCardPresenter)

  // services
  .factory('$assessmentsAuth', $assessmentsAuth)
  .factory('$assessmentResults', $assessmentResults)
  .factory('$auth', $auth)
  .factory('$currentModal', $currentModal)
  .factory('$featureDetection', $featureDetection)
  .factory('$gamesAuth', $gamesAuth)
  .factory('$loadCurrentUser', $loadCurrentUser)
  .factory('$pagination', $pagination)
  .factory('$pillarFiltering', $pillarFiltering)
  .factory('$postHref', $postHref)
  .factory('$promise', $promise)
  .factory('$url', $url)
  .factory('$presenterUtils', $presenterUtils)
  .factory('presenterDispatch', presenterDispatch)
  .factory('$vanityUrlCheck', $vanityUrlCheck)
  .factory('$redirectContent', $redirectContent)
  .factory('$windowResize', $windowResize)
  .factory('authInterceptor', authInterceptor)
  .factory('ActivityPeriodActions', ActivityPeriodActions)
  .factory('Airbrake', Airbrake)
  .factory('AssessmentStatus', AssessmentStatus)
  .factory('AssessmentResultQueries', AssessmentResultQueries)
  .factory('AssessmentResultScores', AssessmentResultScores)
  .factory('assessmentLinkManager', assessmentLinkManager)
  .factory('assessmentStates', assessmentStates)
  .factory('dsoAuth', dsoAuth)
  .factory('dependentMemoize', dependentMemoize)
  .factory('dtmAnalyticsService', dtmAnalyticsService)
  .factory('FutureBrainStats', FutureBrainStats)
  .factory('httpsInterceptor', httpsInterceptor)
  .factory('MBSAssessmentList', MBSAssessmentList)
  .factory('PerformSearch', PerformSearch)
  .factory('dsoModalService', dsoModalService)
  .factory('userPolicies', userPolicies)
  .factory('restrictedRedirectService', restrictedRedirectService)
  .factory('resourceUrlFormatter', resourceUrlFormatter)
  .provider('modalStateHelper', modalStateHelper)

  // directives
  .directive('ssActivityTracker', activityTracker)
  .directive('ssActivityTrackerBinary', activityTrackerBinary)
  .directive('ssActivityTrackerQuantity', activityTrackerQuantity)
  .directive('ssAssessmentButton', assessmentButton)
  .directive('ssAutoRedirect', autoRedirect)
  .directive('ssCard', card)
  .directive('ssCardActivityTracker', cardActivityTracker)
  .directive('ssCards', cards)
  .directive('ssCollectionCard', collectionCard)
  .directive('ssContentDrawer', contentDrawer)
  .directive('ssCurrentLifestyleResultsChart', currentLifestyleResultsChart)
  .directive('ssCurrentNeuroResultsChart', currentNeuroResultsChart)
  .directive('ssEncouragementMessage', encouragementMessage)
  .directive('ssGameIframe', gameIframe)
  .directive('ssInfoBox', infoBox)
  .directive('ssLeadIn', leadIn)
  .directive('ssMastHeadAd', mastHeadAd)
  .directive('ssModal', modal)
  .directive('ssMyFutureBrainChart', myFutureBrainChart)
  .directive('ssNavTabs', navTabs)
  .directive('ssNavPanel', navPanel)
  .directive('ssOnetimeAd', onetimeAd)
  .directive('ssPillarsDisplay', pillarsDisplay)
  .directive('ssPillarFilters', pillarFilters)
  .directive('ssPillarScores', pillarScores)
  .directive('ssPostHref', postHref)
  .directive('ssRelatedContent', relatedContent)
  .directive('ssResultIndexChart', resultIndexChart)
  .directive('ssResultSection', resultSection)
  .directive('ssReviews', reviews)
  .directive('ssSaveUserContent', saveUserContent)
  .directive('ssSocialLinks', socialLinks)
  .directive('ssSideNav', sideNav)
  .directive('ssSquareAd', squareAd)
  .directive('ssSystemMessage', systemMessage)
  .directive('ssTopNav', topNav)
  .directive('ssUpdateMeta', updateMeta)
  .directive('ssUserDashboardCard', userDashboardCard)
  .directive('ssUserDashboardCards', userDashboardCards)
  .directive('ssVideoIframe', videoIframe)

  // controllers
  .controller('ActivityArchiveModalController', ActivityArchiveModalController)
  .controller('ActivityArchiveSuccessModalController',
    ActivityArchiveSuccessModalController)
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
  .controller('AssessmentController', AssessmentController)
  .controller('AssessmentsController', AssessmentsController)
  .controller('AssessmentsCallbackController', AssessmentsCallbackController)
  .controller('AssessmentButtonController', AssessmentButtonController)
  .controller('AssessmentCompletionController', AssessmentCompletionController)
  .controller('CardController', CardController)
  .controller('CardActivityTrackerController', CardActivityTrackerController)
  .controller('CardsController', CardsController)
  .controller(
    'CurrentLifestyleResultsController',
    CurrentLifestyleResultsController
  )
  .controller('CollectionCardController', CollectionCardController)
  .controller('CurrentNeuroResultsController', CurrentNeuroResultsController)
  .controller('DsoModalController', DsoModalController)
  .controller('DsoGenericMocalController', DsoGenericMocalController)
  .controller('EncouragementMessageController', EncouragementMessageController)
  .controller('GameController', GameController)
  .controller('GameIframeController', GameIframeController)
  .controller('GameIframeContentController', GameIframeContentController)
  .controller('GameModalController', GameModalController)
  .controller('GamePlayController', GamePlayController)
  .controller('GamesController', GamesController)
  .controller('HomeController', HomeController)
  .controller('LoginSuccessController', LoginSuccessController)
  .controller('LogoutController', LogoutController)
  .controller('MyFutureBrainController', MyFutureBrainController)
  .controller('NavPanelController', NavPanelController)
  .controller('NeuroPerformanceController', NeuroPerformanceController)
  .controller('OverallResultsController', OverallResultsController)
  .controller('PillarScoresController', PillarScoresController)
  .controller('PillarFiltersController', PillarFiltersController)
  .controller('PillarInfoModalController', PillarInfoModalController)
  .controller('RecipeController', RecipeController)
  .controller('RecipeModalController', RecipeModalController)
  .controller('RecipesController', RecipesController)
  .controller('RelatedContentController', RelatedContentController)
  .controller('ResultIndexController', ResultIndexController)
  .controller('ResultSectionController', ResultSectionController)
  .controller('RetakeAssessmentModalController',
     RetakeAssessmentModalController)
  .controller('ReviewsController', ReviewsController)
  .controller('RequiredTechnologyController', RequiredTechnologyController)
  .controller('SaveUserContentController', SaveUserContentController)
  .controller('SearchResultsController', SearchResultsController)
  .controller('SitemapController', SitemapController)
  .controller('SitemapDataController', SitemapDataController)
  .controller('SocialLinksController', SocialLinksController)
  .controller('StaticController', StaticController)
  .controller('SystemMessageController', SystemMessageController)
  .controller('TopNavController', TopNavController)
  .controller('UpdateMetaController', UpdateMetaController)
  .controller('UserDashboardCardController', UserDashboardCardController)
  .controller('UserDashboardCardsController', UserDashboardCardsController)
  .controller('UserDashboardController', UserDashboardController)
  .controller('UserArchiveController', UserArchiveController)
  .controller('UserArticleController', UserArticleController)
  .controller('UserArticlesController', UserArticlesController)
  .controller('UserAssessmentsController', UserAssessmentsController)
  .controller('UserGameController', UserGameController)
  .controller('UserGamesController', UserGamesController)
  .controller('UserRecipeController', UserRecipeController)
  .controller('UserRecipesController', UserRecipesController)
  .controller('VideoIframeController', VideoIframeController);
