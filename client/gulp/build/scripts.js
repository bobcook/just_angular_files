import path from 'path';
import gulp from 'gulp';
import conf from '../conf';

import $ from '../plugins';

const webpack = function (watch, test, callback) {
  const preLoaders = [];
  if (conf.isDevelopment) {
    preLoaders.push({
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    });
  }

  const webpackOptions = {
    watch: watch,
    module: {
      preLoaders: preLoaders,
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['ng-annotate', 'babel-loader'],
      }],
    },
    output: { filename: 'index.module.js' },
  };

  if (watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  const webpackChangeHandler = function (err, stats) {
    if (err) {
      conf.errorHandler('Webpack')(err);
    }
    $.util.log(stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false,
    }));
    if (watch) {
      require('browser-sync').reload();
      watch = false;
      callback();
    }
  };

  const sources = [ path.join(conf.paths.src, '/app/index.module.js') ];
  if (test) {
    sources.push(path.join(conf.paths.src, '/app/**/*.spec.js'));
    sources.push(path.join(conf.paths.src, '/**/*.mock.js'));
  }

  return gulp.src(sources)
    .pipe($.webpack(webpackOptions, null, webpackChangeHandler))
    .on('error', function () { /* Catch error here to not crash on watch */ })
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
};

gulp.task('scripts', function () {
  return webpack(false, false);
});

gulp.task('scripts:test', function () {
  return webpack(false, true);
})

gulp.task('bower:symlink', function () {
  return gulp.src(conf.wiredep.directory)
    .pipe($.symlink([conf.paths.tmp + '/serve/bower_components'], {
      force: true,
    }));
});

gulp.task('scripts:watch', ['scripts', 'bower:symlink'], function (callback) {
  return webpack(true, false, callback);
});
