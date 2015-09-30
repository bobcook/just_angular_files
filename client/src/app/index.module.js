import config from './index.config';
import routerConfig from './index.route';

import runBlock from './index.run';

// services
import Article from './common/resources/article.js';
import modalStateHelper from './common/services/modal-state-helper.js';

// directives
import contentDrawer from './components/content-drawer/content-drawer.js';
import modal from './components/modal/modal.js';
import sideNav from './components/side-nav/side-nav.js';
import topNav from './components/top-nav/top-nav.js';
import navPanel from './components/nav-panel/nav-panel.js';

// controllers
import ArticlesController from './articles/articles.controller.js';
import HomeController from './home/home.controller.js';
import NavPanelController from './components/nav-panel/nav-panel.controller.js';
import TopNavController from './components/top-nav/top-nav.controller.js';

angular.module('aarp-staying-sharp', [
  'aarp-staying-sharp.constants',
  'angularModalService',
  'ngAnimate',
  'rails',
  'ui.router',
  'ui.router.stateHelper',
  'ui.select',
])
  .config(config)
  .config(routerConfig)

  .run(runBlock)

  .factory('Article', Article)
  .provider('modalStateHelper', modalStateHelper)

  .directive('ssContentDrawer', contentDrawer)
  .directive('ssModal', modal)
  .directive('ssSideNav', sideNav)
  .directive('ssTopNav', topNav)
  .directive('ssNavPanel', navPanel)

  .controller('ArticlesController', ArticlesController)
  .controller('HomeController', HomeController)
  .controller('NavPanelController', NavPanelController)
  .controller('TopNavController', TopNavController);
