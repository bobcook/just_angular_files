/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

import gutil from 'gulp-util';

const path = require('path');

exports.isDevelopment = process.env.NODE_ENV !== 'production';

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  root: path.resolve('../'),
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  directory: 'bower_components',
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
  return function (err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
