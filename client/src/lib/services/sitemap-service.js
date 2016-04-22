'use strict'

const sm = require('sitemap');
const _ = require('lodash');
const phantom = require('phantom');
const cheerio = require('cheerio');
const s3 = require('s3');
const fs = require('fs');
const path = require('path');

const sitemapUrls = function (urlsJson) {
  return _.map(urlsJson, sitemapData);
};

const sitemapData = function (urlObj) {
  const url = urlObj.url;
  const priority = (url === '/') ? 0.1 : calculatePriority(url);
  const date = urlObj.lastModified ? formatDate(urlObj.lastModified) : '';
  return {
    url: url,
    priority: priority,
    changefreq: 'weekly',
    lastmod: date,
    lastmodrealtime: true
  };
};

const formatDate = function (dateStr) {
  return dateStr.split('T')[0];
};

const calculatePriority = function (url) {
  return 1.0 - (_.compact(url.split('/')).length / 10.0);
};

const sitemapDataRoute = function (request) {
  return `https://${request.headers.host}/sitemap-data`;
};


const generateSitemap = function (urlsJson, hostname) {
  return sm.createSitemap({
    hostname: `https://${hostname}`,
    cacheTime: 600000,
    urls: sitemapUrls(urlsJson)
  });
};

const s3Client = function () {
  return s3.createClient({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_LOCATION,
  });
};

const scrapePage = function (req) {
  let sitepage;
  return phantom.create().then(function(instance) {
    return instance.createPage();
  }).then(function(page) {
    sitepage = page;
    return page.open(sitemapDataRoute(req));
  }).then(function(status) {
    return new Promise(function (resolve, reject) {
      // TODO: find a better way to wait for angular to load all page content
      setTimeout(function () {
        resolve(sitepage.property('content'));
      }, 3000);
    })
  }).then(function(content) {
    const $ = cheerio.load(content);
    return JSON.parse($('#sitemap-urls').text());
  });
};

const upload = function (sitemap) {
  fs.writeFile(
    path.join(__dirname, '/sitemap.xml'),
    sitemap.toString(),
    () => {
      const params = {
        localFile: path.join(__dirname, '/sitemap.xml'),
        s3Params: {
          Bucket: process.env.SITEMAP_S3_BUCKET,
          Key: process.env.SITEMAP_S3_KEY,
        },
      };
      s3Client().uploadFile(params);
    }
  );
};

module.exports = {
  createSitemap: function (request, dataSource) {
    const data = dataSource || scrapePage;
    return data(request).then(function (urlsJson) {
      return generateSitemap(urlsJson, request.headers.host);
    });
  },
  upload: upload
};
