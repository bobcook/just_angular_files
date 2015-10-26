import config from './index.config';
import routerConfig from './index.route';
import addConstants from './index.constants';

import runBlock from './index.run';

// filters
import hyphenate from './common/filters/hyphenate.js';

// resources
import Activity from './common/resources/activity.js';
import ActivityTrackerResponse from
  './common/resources/activity-tracker-response.js';
import Article from './common/resources/article.js';
import ArticleReview from './common/resources/article-review.js';
import CurrentUser from './common/resources/current-user.js';
import Pillar from './common/resources/pillar.js';
import Recipe from './common/resources/recipe.js';
import UserActivity from './common/resources/user-activity.js';
import UserActivityPeriod from './common/resources/user-activity-period.js';
import UserArticle from './common/resources/user-article.js';

// services
import $auth from './common/services/auth.js';
import $assessmentsAuth from './assessments/assessments-auth.js';
import $loadCurrentUser from './common/services/load-current-user.js';
import $pillarFiltering from './common/services/pillar-filtering.js';
import $postHref from './common/services/post-href.js';
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
import cardPillars from './components/card/pillars.js';
import cards from './components/cards/cards.js';
import contentDrawer from './components/content-drawer/content-drawer.js';
import deleteUserContent from
  './components/delete-user-content/delete-user-content.js';
import infoBox from './components/info-box/info-box.js';
import modal from './components/modal/modal.js';
import navPanel from './components/nav-panel/nav-panel.js';
import pillarFilters from './components/pillar-filters/pillar-filters.js';
import postHref from './common/directives/post-href.js';
import reviews from './components/reviews/reviews.js';
import sideNav from './components/side-nav/side-nav.js';
import socialLinks from './components/social-links/social-links.js';
import topNav from './components/top-nav/top-nav.js';

// controllers
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
import CardController from './components/card/card.controller.js';
import CardsController from './components/cards/cards.controller.js';
import DeleteUserContentController from
  './components/delete-user-content/delete-user-content.controller.js';
import HomeController from './home/home.controller.js';
import LoginSuccessController from './callbacks/login-success.controller.js';
import LogoutController from './logout/logout.controller.js';
import NavPanelController from './components/nav-panel/nav-panel.controller.js';
import PillarFiltersController from
  './components/pillar-filters/pillar-filters.controller.js';
import RecipeController from './recipes/recipe.controller.js';
import RecipesController from './recipes/recipes.controller.js';
import ReviewsController from './components/reviews/reviews.controller.js';
import SocialLinksController from
  './components/social-links/social-links.controller.js';
import TopNavController from './components/top-nav/top-nav.controller.js';
import UserArticleController from
  './me/articles/user-article.controller.js';
import UserArticlesController from './me/articles/user-articles.controller.js';

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
  .filter('hyphenate', hyphenate)

  // resources
  .factory('Activity', Activity)
  .factory('ActivityTrackerResponse', ActivityTrackerResponse)
  .factory('Article', Article)
  .factory('ArticleReview', ArticleReview)
  .factory('CurrentUser', CurrentUser)
  .factory('Pillar', Pillar)
  .factory('Recipe', Recipe)
  .factory('UserActivity', UserActivity)
  .factory('UserActivityPeriod', UserActivityPeriod)
  .factory('UserArticle', UserArticle)

  // services
  .factory('$assessmentsAuth', $assessmentsAuth)
  .factory('$auth', $auth)
  .factory('$loadCurrentUser', $loadCurrentUser)
  .factory('$pillarFiltering', $pillarFiltering)
  .factory('$postHref', $postHref)
  .factory('authInterceptor', authInterceptor)
  .factory('dependentMemoize', dependentMemoize)
  .provider('modalStateHelper', modalStateHelper)

  // directives
  .directive('ssActivityTracker', activityTracker)
  .directive('ssActivityTrackerBinary', activityTrackerBinary)
  .directive('ssActivityTrackerQuantity', activityTrackerQuantity)
  .directive('ssCard', card)
  .directive('ssCardPillars', cardPillars)
  .directive('ssCards', cards)
  .directive('ssContentDrawer', contentDrawer)
  .directive('ssDeleteUserContent', deleteUserContent)
  .directive('ssInfoBox', infoBox)
  .directive('ssModal', modal)
  .directive('ssNavPanel', navPanel)
  .directive('ssPillarFilters', pillarFilters)
  .directive('ssPostHref', postHref)
  .directive('ssReviews', reviews)
  .directive('ssSocialLinks', socialLinks)
  .directive('ssSideNav', sideNav)
  .directive('ssTopNav', topNav)

  // controllers
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
  .controller('CardController', CardController)
  .controller('CardsController', CardsController)
  .controller('DeleteUserContentController', DeleteUserContentController)
  .controller('HomeController', HomeController)
  .controller('LoginSuccessController', LoginSuccessController)
  .controller('LogoutController', LogoutController)
  .controller('NavPanelController', NavPanelController)
  .controller('PillarFiltersController', PillarFiltersController)
  .controller('RecipeController', RecipeController)
  .controller('RecipesController', RecipesController)
  .controller('ReviewsController', ReviewsController)
  .controller('SocialLinksController', SocialLinksController)
  .controller('TopNavController', TopNavController)
  .controller('UserArticleController', UserArticleController)
  .controller('UserArticlesController', UserArticlesController);
