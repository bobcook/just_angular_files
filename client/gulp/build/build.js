import path from 'path';
import gulp from 'gulp';
import conf from '../conf';
import rename from 'gulp-rename';

import $ from '../plugins';

const gutil = require('gulp-util');
const utils = require('./build-utils.js');

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html'),
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'aarp-staying-sharp',
      root: 'app',
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('partials:symlink', ['partials'], function () {
  return gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'))
    .pipe($.symlink([
      path.join(conf.paths.tmp, '/serve/templateCacheHtml.js'),
    ], { force: true }));
});

gulp.task('partials:watch', ['partials:symlink'], function () {
  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), ['partials']);
});

gulp.task('html', ['inject', 'partials'], function () {
  const htmlFilter = $.filter('*.html', { restore: true });
  const jsFilter = $.filter('**/*.js', { restore: true });
  const cssFilter = $.filter('**/*.css', { restore: true });
  const assets = $.useref.assets();

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe(assets)
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense }))
      .on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true,
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('server', function () {
  return gulp.src([
    path.join(conf.paths.src, '/server.js'),
    path.join(conf.paths.src, '/package.json')
  ])
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('lib', function () {
  return gulp.src([
    path.join(conf.paths.src, '/lib/**/*.js')
  ]).pipe(gulp.dest(path.join(conf.paths.dist, '/lib/')));
});

gulp.task('robots', function () {
  const robotsFiles = {
    dev: 'robots.disallow.txt',
    staging: 'robots.disallow.txt',
    production: 'robots.production.txt',
  };
  const robotsForEnv = robotsFiles[utils.getEnvName()];
  return gulp.src([
    path.join(conf.paths.src, robotsForEnv)
  ])
    .pipe(rename('robots.txt'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
});

gulp.task('other', function () {
  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/robots.*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}'),
    path.join(conf.paths.src, '/**/*'),
  ])
    .pipe($.filter((file) => file.stat.isFile()))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/')))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('elasticBeanstalkConfig', function () {
  return gulp.src([
    path.join(conf.paths.src, '/.elasticbeanstalk/**/*')
  ]).pipe(gulp.dest(path.join(conf.paths.dist, '/.elasticbeanstalk/')));
});

gulp.task('other:watch', ['other'], function () {
  gulp.watch([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}'),
  ], ['other']);
});

gulp.task('verificationFile', function () {
  const verificationFiles = {
    dev: '/client/verification-files/googlebebc04c0a7a96d72.html',
  };

  const filePath = verificationFiles[utils.getEnvName()];
  if (!filePath) { return; }
  return gulp.src(
    path.join(conf.paths.root, filePath)
  ).pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function (done) {
  gutil.log('deleting dist and tmp files...');
  $.del([
    path.join(conf.paths.dist, '/'),
    path.join(conf.paths.tmp, '/'),
  ], { force: true }, done);
});

gulp.task(
  'build',
  [
    'html',
    'fonts',
    'server',
    'lib',
    'redirects:import',
    'verificationFile',
    'robots',
    'other',
    'elasticBeanstalkConfig'
  ]
);
