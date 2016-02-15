'use strict';

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

  return {
    fetch: fetch,
    fileExists: fileExists,
  };
};

module.exports = BuildUtils();
