export default require('gulp-load-plugins')({
  pattern: [
    'gulp-*',
    'del',
    'main-bower-files',
    'run-sequence',
    'uglify-save-license',
    'webpack-stream',
  ],
  rename: {
    'webpack-stream': 'webpack',
  },
});
