import gulp from 'gulp';
import wrench from 'wrench';

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
const requireTasks = function (directory) {
  wrench.readdirSyncRecursive(directory)
    .filter((file) => /\.js$/.test(file))
    .forEach((file) => require(directory + '/' + file));
};

requireTasks('./gulp/build');
if (process.env.NODE_ENV !== 'production') {
  requireTasks('./gulp/development');
}

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
