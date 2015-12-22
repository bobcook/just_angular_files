import gulp from 'gulp';
import path from 'path';
import conf from '../conf';

const awspublish = require('gulp-awspublish');
const cloudfront = require('gulp-cloudfront');
const fs = require('fs');
const gutil = require('gulp-util');
const minimist = require('minimist');
const revOutdated = require('gulp-rev-outdated');
const rimraf = require('rimraf'); // deprecated; should replace w/ del
const s3ChangeIndex = require('gulp-s3-index');
const spawn = require('child_process').spawn;
const through = require('through2');
const RevAll = require('gulp-rev-all');

const fetch = function (obj, key, defaultVal) {
  const result = obj[key] || defaultVal;
  if (result) {
    return result;
  } else {
    throw `Key '${key}' was not present`;
  }
};

const getEnv = function () {
  const knownOptions = {
    string: 'env',
    default: { env: 'staging' }
  };
  const options = minimist(process.argv.slice(2), knownOptions);
  return fetch(options, 'env');
};

const getAwsConf = function (filePath, env) {
  gutil.log('Reading aws.json');
  const awsConfAllEnvs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return fetch(awsConfAllEnvs, env);
};

gulp.task('deploy', ['build'], function() {
  const env = getEnv();
  const awsConf = getAwsConf('aws.json', env);

  gutil.log(`Pushing to ${env} environment`);

  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  const publisher = awspublish.create(awsConf);

  const headers = {
    'Cache-Control': 'max-age=3600, no-transform, public',
  };

  // Appends content hash to filenames and re-writes references;
  // Gets around needing to invalidate Cloudfront cache on every deploy
  const revAll = new RevAll();

  return gulp.src(path.join(conf.paths.dist, '/**/*'))
    .pipe(revAll.revision())

    .pipe(publisher.publish(headers))

    // Uncomment to make files on S3 match local versions;
    // should run clean:old beforehand
    //
    // XXX: caution -- Cloudfront takes a few
    // minutes to catch up, so if you delete files
    // it's expecting to be in S3, site will be unusable. Should
    // only run during low-traffic periods, or else figure out
    // how to remove files that aren't currently referenced by Cloudfront
    //.pipe(publisher.sync())

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    // print upload updates to console
    .pipe(awspublish.reporter())

    // Change S3's index file to match the newly versioned one
    .pipe(s3ChangeIndex(awsConf))

    // Change Cloudfront's default root object to match the newly versioned one
    .pipe(cloudfront(awsConf));
});

const cleaner = function () {
  return through.obj(function (file, enc, cb){
    rimraf(
      path.resolve((file.cwd || process.cwd()), file.path),
      function (err) {
        if (err) {
          this.emit('error', new gutil.PluginError('Cleanup old files', err));
        }
        this.push(file);
        cb();
      }.bind(this)
    );
  });
};

// Cleans outdated files (locally) in /dist
gulp.task('clean:old', function (done) {
  return gulp.src(path.join(conf.paths.dist, '/**/*'), { read: false })
    .pipe(revOutdated(2))
    .pipe(cleaner());
});
