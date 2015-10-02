import path from 'path';
import gulp from 'gulp';
import conf from '../conf';

import _ from 'lodash';
import $ from '../plugins';

const wiredep = require('wiredep').stream;

gulp.task('styles', function () {
  const sassOptions = {
    style: 'expanded',
  };

  const injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.{css,scss}'),
    path.join('!' + conf.paths.src, '/app/**/_*.scss'),
    path.join('!' + conf.paths.src, '/app/index.scss'),
  ], { read: false });

  const injectOptions = {
    transform: function (filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false,
  };

  let stream = gulp.src([
    path.join(conf.paths.src, '/app/index.scss'),
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));

  if (conf.isDevelopment) {
    stream = stream.pipe(require('browser-sync').reload({ stream: true }));
  }

  return stream;
});
