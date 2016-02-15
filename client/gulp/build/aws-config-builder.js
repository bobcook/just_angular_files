'use strict';

const utils = require('./build-utils.js');

const AwsConfigBuilder = function () {
  const build = function (env) {
    const bucket = utils.fetch(env, 'AWS_BUILD_S3_BUCKET');
    const region = utils.fetch(env, 'AWS_BUILD_S3_BUCKET_REGION');
    const accessKeyId = utils.fetch(env, 'AWS_BUILD_ACCESS_KEY_ID');
    const secretAccessKey = utils.fetch(env, 'AWS_BUILD_SECRET_ACCESS_KEY');
    const cloudfrontDistribution =
      utils.fetch(env, 'AWS_BUILD_CLOUDFRONT_DISTRIBUTION');

    return {
      region: region,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      distributionId: cloudfrontDistribution,
      bucket: bucket,
      params: {
        Bucket: bucket,
      },
    };
  };

  return {
    build: build,
  };
};

module.exports = AwsConfigBuilder();

