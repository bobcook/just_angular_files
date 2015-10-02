import config from './index.config';
import routerConfig from './index.route';
import installEnvironment from './index.env';

import runBlock from './index.run';

// config
import ApiRoutes from './common/config/api-routes.js';

// resources
import Article from './common/resources/article.js';

// services
import $auth from './common/services/auth.js';
import $assessmentsAuth from './assessments/assessments-auth.js';
import $postHref from './common/services/post-href.js';
import $currentUser from './common/services/current-user.js';
import authInterceptor from './common/services/auth-interceptor.js';
import modalStateHelper from './common/services/modal-state-helper.js';

// directives
import contentDrawer from './components/content-drawer/content-drawer.js';
import modal from './components/modal/modal.js';
import navPanel from './components/nav-panel/nav-panel.js';
import postHref from './common/directives/post-href.js';
import sideNav from './components/side-nav/side-nav.js';
import topNav from './components/top-nav/top-nav.js';

// controllers
import ArticlesController from './articles/articles.controller.js';
import ArticlesDetailController from './articles/articlesDetail.controller.js';
import HomeController from './home/home.controller.js';
import LoginSuccessController from './callbacks/login-success.controller.js';
import LogoutController from './logout/logout.controller.js';
import NavPanelController from './components/nav-panel/nav-panel.controller.js';
import RecipesController from './recipes/recipes.controller.js';
import TopNavController from './components/top-nav/top-nav.controller.js';

const app = angular.module('aarp-staying-sharp', [
  'angularModalService',
  'ngAnimate',
  'ngStorage',
  'rails',
  'ui.router',
  'ui.router.stateHelper',
  'ui.select',
]);

installEnvironment(app);

app
  .config(config)
  .config(routerConfig)

  .run(runBlock)

  .factory('ApiRoutes', ApiRoutes)

  .factory('Article', Article)

  .factory('$assessmentsAuth', $assessmentsAuth)
  .factory('$auth', $auth)
  .factory('$currentUser', $currentUser)
  .factory('$postHref', $postHref)
  .factory('authInterceptor', authInterceptor)
  .provider('modalStateHelper', modalStateHelper)

  .directive('ssContentDrawer', contentDrawer)
  .directive('ssModal', modal)
  .directive('ssNavPanel', navPanel)
  .directive('ssPostHref', postHref)
  .directive('ssSideNav', sideNav)
  .directive('ssTopNav', topNav)

  .controller('ArticlesController', ArticlesController)
  .controller('ArticlesDetailController', ArticlesDetailController)
  .controller('HomeController', HomeController)
  .controller('LoginSuccessController', LoginSuccessController)
  .controller('LogoutController', LogoutController)
  .controller('NavPanelController', NavPanelController)
  .controller('RecipesController', RecipesController)
  .controller('TopNavController', TopNavController);
