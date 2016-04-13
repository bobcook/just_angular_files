'use strict';

const minimist = require('minimist');
const fs = require('fs');

const BuildUtils = function () {
  const fetch = function (obj, key, defaultVal) {
    const result = obj[key] || defaultVal;
    if (result) {
      return result;
    } else {
      throw `Key '${key}' was not present`;
    }
  };

  const fileExists = function (file) {
    try {
      return !!fs.statSync(file);
    } catch(_e) {
      return false;
    };
  };

  const getEnvName = function () {
    const knownOptions = {
      string: 'env',
      default: { env: 'staging' }
    };
    const options = minimist(process.argv.slice(2), knownOptions);
    return fetch(options, 'env');
  };

  return {
    fetch: fetch,
    fileExists: fileExists,
    getEnvName: getEnvName,
  };
};

module.exports = BuildUtils();
