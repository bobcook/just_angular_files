var gulp = require('gulp');
var conf = require('../conf');

var _ = require('lodash');

var superstatic = require('superstatic').server;
var exec = require('child_process').exec;

var runServer = function (root) {
  var baseConfig = require('../../divshot.json');
  var app = superstatic({
    config: _.merge({}, baseConfig, {
      root: root,
      'cache_control': {
        '**': false,
      },
    }),
    port: process.env.STATIC_SERVER_PORT || 9000,
    live: true,
  });
  app.listen();
};

gulp.task('serve', ['watch'], function () {
  runServer(conf.paths.tmp + '/serve');
});

gulp.task('serve:dist', ['build'], function () {
  runServer(conf.paths.dist);
});

gulp.task('rails', function() {
  exec('../bin/rails s');
});

gulp.task('serve:full-stack', ['rails', 'serve']);
