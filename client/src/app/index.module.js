/* global $:false */

import config from './index.config';
import routerConfig from './index.route';

import runBlock from './index.run';

// services
import Article from './common/resources/article.js';

// controllers
import MainController from './main/main.controller';
import ArticlesController from './articles/articles.controller.js';

angular.module('aarp-staying-sharp', ['ngAnimate', 'ngResource', 'ui.router'])
  .config(config)
  .config(routerConfig)

  .run(runBlock)

  .factory('Article', Article)

  .controller('MainController', MainController)
  .controller('ArticlesController', ArticlesController);
