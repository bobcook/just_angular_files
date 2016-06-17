import path from 'path';
import gulp from 'gulp';
import conf from '../conf';

import { Server } from 'karma';

gulp.task('test', ['scripts:test'], function (done) {
  new Server({
    configFile: path.join(__dirname, '/../../karma.conf.js'),
    singleRun: true,
  }, done).start();
});
