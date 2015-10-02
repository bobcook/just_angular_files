var path = require('path');
var gulp = require('gulp');
var conf = require('../conf');

var $ = require('gulp-load-plugins')();

function webpack(watch, callback) {
  var preLoaders = [];
  if (conf.isDevelopment) {
    preLoaders.push({
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    });
  }

  var webpackOptions = {
    watch: watch,
    module: {
      preLoaders: preLoaders,
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}]
    },
    output: { filename: 'index.module.js' }
  };

  if(watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function(err, stats) {
    if(err) {
      conf.errorHandler('Webpack')(err);
    }
    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    if(watch) {
      require('browser-sync').reload();
      watch = false;
      callback();
    }
  };

  return gulp.src(path.join(conf.paths.src, '/app/index.module.js'))
    .pipe($.webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('scripts', function () {
  return webpack(false);
});

gulp.task('bower:symlink', function () {
  return gulp.src(conf.wiredep.directory)
    .pipe($.symlink([conf.paths.tmp + '/serve/bower_components'], {
      force: true,
    }));
});

gulp.task('scripts:watch', ['scripts', 'bower:symlink'], function (callback) {
  return webpack(true, callback);
});
