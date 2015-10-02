var gulp = require('gulp');
var conf = require('../conf');

if (conf.isDevelopment) {
  require('gulp-graph')(gulp);
}
