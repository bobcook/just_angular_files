import path from 'path';
import gulp from 'gulp';
import conf from '../conf';

import _ from 'lodash';
import $ from '../plugins';

const utils = require('./build-utils.js');
const wiredep = require('wiredep').stream;
const gutil = require('gulp-util');

gulp.task('inject', ['scripts', 'partials', 'styles'], function () {
  const injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'),
  ], { read: false });

  const injectScripts = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.module.js'),
    path.join(conf.paths.tmp, '/serve/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
  ], { read: false });

  const injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false,
  };

  const partialsInjectFile = gulp.src(
    path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'),
    { read: false }
  );
  const partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false,
  };

  const adobeUrlBase = 'https://assets.adobedtm.com/2755d5b313381183ec8ddef72' +
    'ce582193e25b5a4/satelliteLib-805aa8204ac81b4deda113894acff79bf57258a9';

  const adobeTag = (utils.getEnvName() === 'production')
    ? `<script src="${adobeUrlBase}.js"></script>`
    : `<script src="${adobeUrlBase}-staging.js"></script>`

  gutil.log(`Injecting DTM for ${utils.getEnvName()} environment`);

  const dtmInjectOptions = {
    starttag: '<!-- inject:dtm -->',
    transform: function() {
      return adobeTag;
    },
    empty: true
  };

  const headTags = function (envName) {
    return envName === 'production'
      ? `<meta name="robots" content="">`
      : `<meta name="robots" content="noindex, nofollow">`;
  };

  const headInjectOptions = {
    starttag: '<!-- inject:head -->',
    transform: function() {
      return headTags(utils.getEnvName());
    },
    empty: true
  };

  const fixedContent = gulp.src(
    '',
    { read: false }
  );

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(fixedContent, dtmInjectOptions))
    .pipe($.inject(fixedContent, headInjectOptions))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
