import path from 'path';
import conf from './gulp/conf';

import _ from 'lodash';
import wiredep from 'wiredep';

const listFiles = function () {
  const wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true,
  });

  return wiredep(wiredepOptions).js
    .concat([
      path.join(conf.paths.src, '/app/test-helper.mock.js'),
      path.join(conf.paths.tmp, '/serve/app/index.module.js'),
      path.join(conf.paths.src, '/**/*.html'),
    ]);
};

module.exports = function (config) {
  const configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'client',
    },

    browsers : ['Chrome'],

    plugins : [
      'karma-babel-preprocessor',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-sinon-chai',
      'karma-ng-html2js-preprocessor',
    ],

    preprocessors: {
      'src/**/*.js': ['babel'],
      'src/**/*.html': ['ng-html2js'],
    },
  };

  config.set(configuration);
};
