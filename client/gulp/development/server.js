import gulp from 'gulp';
import conf from '../conf';

import _ from 'lodash';

const superstatic = require('superstatic').server;

const runServer = function (root) {
  const baseConfig = require('../../divshot.json');
  const app = superstatic({
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
