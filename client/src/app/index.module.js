import config from './index.config';
import routerConfig from './index.route';
import addConstants from './index.constants';

import runBlock from './index.run';

// resources
import Activity from './common/resources/activity.js';
import ActivityTrackerResponse from
  './common/resources/activity-tracker-response.js';
import Article from './common/resources/article.js';
import UserActivity from './common/resources/user-activity.js';
import UserActivityPeriod from './common/resources/user-activity-period.js';

// services
import $auth from './common/services/auth.js';
import $assessmentsAuth from './assessments/assessments-auth.js';
import $postHref from './common/services/post-href.js';
import $currentUser from './common/services/current-user.js';
import authInterceptor from './common/services/auth-interceptor.js';
import dependentMemoize from './common/services/dependent-memoize.js';
import modalStateHelper from './common/services/modal-state-helper.js';

// directives
import activityTracker from './components/activity-tracker/activity-tracker.js';
import activityTrackerBinary from
  './components/activity-tracker/binary/binary.js';
import activityTrackerQuantity from
  './components/activity-tracker/quantity/quantity.js';
import contentDrawer from './components/content-drawer/content-drawer.js';
import infoBox from './components/info-box/info-box.js';
import modal from './components/modal/modal.js';
import navPanel from './components/nav-panel/nav-panel.js';
import postHref from './common/directives/post-href.js';
import sideNav from './components/side-nav/side-nav.js';
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
import ArticlesController from './articles/articles.controller.js';
import ArticlesDetailController from './articles/articles-detail.controller.js';
import ArticleModalController from './articles/article-modal.controller.js';
import HomeController from './home/home.controller.js';
import LoginSuccessController from './callbacks/login-success.controller.js';
import LogoutController from './logout/logout.controller.js';
import NavPanelController from './components/nav-panel/nav-panel.controller.js';
import RecipesController from './recipes/recipes.controller.js';
import TopNavController from './components/top-nav/top-nav.controller.js';
import UserArticlesController from './me/user-articles.controller.js';

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

  .factory('Activity', Activity)
  .factory('ActivityTrackerResponse', ActivityTrackerResponse)
  .factory('Article', Article)
  .factory('UserActivity', UserActivity)
  .factory('UserActivityPeriod', UserActivityPeriod)

  .factory('$assessmentsAuth', $assessmentsAuth)
  .factory('$auth', $auth)
  .factory('$currentUser', $currentUser)
  .factory('$postHref', $postHref)
  .factory('authInterceptor', authInterceptor)
  .factory('dependentMemoize', dependentMemoize)
  .provider('modalStateHelper', modalStateHelper)

  .directive('ssActivityTracker', activityTracker)
  .directive('ssActivityTrackerBinary', activityTrackerBinary)
  .directive('ssActivityTrackerQuantity', activityTrackerQuantity)
  .directive('ssContentDrawer', contentDrawer)
  .directive('ssInfoBox', infoBox)
  .directive('ssModal', modal)
  .directive('ssNavPanel', navPanel)
  .directive('ssPostHref', postHref)
  .directive('ssSideNav', sideNav)
  .directive('ssTopNav', topNav)

  .controller('ActivityTrackerController', ActivityTrackerController)
  .controller('ActivityTrackerBinaryController',
    ActivityTrackerBinaryController)
  .controller('ActivityTrackerQuantityController',
    ActivityTrackerQuantityController)
  .controller('ActivityTrackerQuantityEditPeriodController',
    ActivityTrackerQuantityEditPeriodController)
  .controller('ArticlesController', ArticlesController)
  .controller('ArticlesDetailController', ArticlesDetailController)
  .controller('ArticleModalController', ArticleModalController)
  .controller('HomeController', HomeController)
  .controller('LoginSuccessController', LoginSuccessController)
  .controller('LogoutController', LogoutController)
  .controller('NavPanelController', NavPanelController)
  .controller('RecipesController', RecipesController)
  .controller('TopNavController', TopNavController)
  .controller('UserArticlesController', UserArticlesController);
