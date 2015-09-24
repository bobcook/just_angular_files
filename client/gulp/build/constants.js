'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../conf');

var $ = require('gulp-load-plugins')();

gulp.task('set-env', function () {
  try {
    $.env({ file: '.env.json' });
  } catch (e) {
    console.warn(
      'set-env: .env.json not found, not loading environment from file'
    );
  }
});

gulp.task('constants', ['set-env'], function () {
  var constants = {
    API_URL: process.env.API_URL
  };

  return $.ngConstant({
    name: 'aarp-staying-sharp',
    constants: constants,
    stream: true
  })
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
});
