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

gulp.task('zipDist', ['build'], function() {
  gutil.log('zipping up application...');
  return gulp.src(path.join(conf.paths.dist, '/**/*'))
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('deploy:awseb', function (callback) {
  gutil.log(`preparing upload for ${getEnvName()}...`);
  const config = awsEbConfig();
  const accessKeyId = config.accessKeyId;
  const secretAccessKey = config.secretAccessKey;
  const envName = config.envName;
  const execSync = require('child_process').execSync;

  execSync(
    `cd ${conf.paths.dist} && AWS_ACCESS_KEY_ID=${accessKeyId} ` +
    `AWS_SECRET_ACCESS_KEY=${secretAccessKey} ` +
    `eb deploy ${envName} `,
    { stdio: [process.stdin, process.stdout, process.stderr] }
  );

});
