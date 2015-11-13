import path from 'path';
import gulp from 'gulp';
import conf from '../conf';

const isOnlyChange = function (event) {
  return event.type === 'changed';
};

gulp.task('watch', ['scripts:watch', 'partials:watch', 'other:watch', 'inject'],
function () {
  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject']);

  gulp.watch([
    path.join(conf.paths.src, '/app/**/*.css'),
    path.join(conf.paths.src, '/app/**/*.scss'),
  ], function (event) {
    if (isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('inject');
    }
  });
});
