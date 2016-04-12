import gulp from 'gulp';
import path from 'path';
import conf from '../conf';

const zip = require('gulp-zip');
const utils = require('./build-utils.js');
const minimist = require('minimist');
const gutil = require('gulp-util');
const del = require('del');
const fs = require('fs');
const awsBeanstalk = require('node-aws-beanstalk');

const getEnvName = function () {
  const knownOptions = {
    string: 'env',
    default: { env: 'staging' }
  };
  const options = minimist(process.argv.slice(2), knownOptions);
  return utils.fetch(options,  'env');
};

const awsEbConfig = function () {
  const envName = getEnvName();
  gutil.log(`retrieving config for ${envName} environment...`);
  return require(awsEbConfigFile());
};

const awsEbConfigFile = function () {
  return path.join(conf.paths.root, `client/awseb-${getEnvName()}-config.js`);
};

gulp.task('bumpVersion', function() {
  const config = awsEbConfig()
  const oldVersion = config.version;
  const versionNums = oldVersion.split('.')
  const patchNum = Number(versionNums[versionNums.length - 1]) + 1;
  versionNums[versionNums.length - 1] = patchNum;
  config.version = versionNums.join('.');
  gutil.log(`bumping version from ${oldVersion} to ${config.version}`);
  fs.writeFile(awsEbConfigFile(), `module.exports=${JSON.stringify(config)}`);
})

gulp.task('zipDist', ['build', 'bumpVersion'], function() {
  gutil.log('zipping up application...');
  return gulp.src(path.join(conf.paths.dist, '/**/*'))
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('deploy:awseb', ['zipDist'], function (callback) {
  gutil.log(`preparing upload for ${getEnvName()}...`);
  awsBeanstalk.deploy(
    path.join(conf.paths.dist, '/dist.zip'),
    awsEbConfig(),
    callback
  );
});
