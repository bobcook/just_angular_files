import gulp from 'gulp';
import path from 'path';
import conf from '../conf';

const awspublish = require('gulp-awspublish');
const cloudfront = require('gulp-cloudfront');
const fs = require('fs');
const gutil = require('gulp-util');
const minimist = require('minimist');
const rimraf = require('rimraf'); // deprecated; should replace w/ del
const s3ChangeIndex = require('gulp-s3-index');
const spawn = require('child_process').spawn;
const filter = require('gulp-filter');
const RevAll = require('gulp-rev-all');
const utils = require('./build-utils.js');
const awsConfigBuilder = require('./aws-config-builder.js');

const dotEnvPath = path.join(conf.paths.root, '.env');
const env = utils.fileExists(dotEnvPath)
            ? require('dotenv').config({ path: dotEnvPath })
            : process.env;

const getEnvName = function () {
  const knownOptions = {
    string: 'env',
    default: { env: 'staging' }
  };
  const options = minimist(process.argv.slice(2), knownOptions);
  return utils.fetch(options, 'env');
};

const getAwsConf = function (filePath, envName) {
  gutil.log('Reading aws.json');
  try {
    const awsConfAllEnvs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return utils.fetch(awsConfAllEnvs, envName);
  } catch(_err) {
    gutil.log('No aws.json found; reading from project .env');
    return awsConfigBuilder.build(env);
  }
};

gulp.task('deploy', ['build'], function() {
  const envName = getEnvName();
  const awsConf = getAwsConf('aws.json', envName);
  const publisher = awspublish.create(awsConf);
  const headers = {
    'Cache-Control': 'max-age=3600, no-transform, public',
  };

  // Only want to version non-images since image names can be dynamic
  // and won't be found by gulp rev-all
  const allExceptImages =
    filter([
      '*',
      '!assets/images/*',
      '!future_brain_data.json',
    ], { restore: true });

  // Appends content hash to filenames and re-writes references;
  // Gets around needing to invalidate Cloudfront cache on every deploy
  const revAll = new RevAll();

  gutil.log(`Pushing to ${envName} environment`);

  return gulp.src(path.join(conf.paths.dist, '/**/*'))
    .pipe(allExceptImages)
    .pipe(revAll.revision())
    .pipe(allExceptImages.restore)
    .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    // print upload updates to console
    .pipe(awspublish.reporter())

    // Change S3's index file to match the newly versioned one
    .pipe(s3ChangeIndex(awsConf))

    // Change Cloudfront's default root object to match the newly versioned one
    .pipe(cloudfront(awsConf));
});
