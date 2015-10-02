import path from 'path';
import gulp from 'gulp';
import conf from '../conf';

import karma from 'karma';

gulp.task('test', ['scripts'], function (done) {
  karma.server.start({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: true,
  }, done);
});
