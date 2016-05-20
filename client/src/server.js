'use strict'

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const SitemapService = require('./lib/services/sitemap-service');
const redirectsJson = require('./redirects.json');
const url = require('url');
const auth = require('./lib/services/basic-auth-service');
const https = require('https');
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(require('prerender-node')
  .set('prerenderToken', process.env.PRERENDER_TOKEN));

const assets = ['styles', 'scripts', 'app', 'robots.txt', 'favicon.ico'];

app.get(/.json$/, function (req, res) {
  res.sendFile(__dirname + req.url);
});

app.get('/sitemap.xml', function (req, res) {
  const file = fs.createWriteStream('sitemap.xml');
  https.get(process.env.SITEMAP_S3_LOCATION, function (response) {
    response.pipe(file);
    file.on('finish', function () {
      file.close(function () {
        res.sendFile(`${__dirname}/${file.path}`);
      });
    });
  }).on('error', function(err) {
    res.status(500).send(err);
  });
});

app.get(/google.*html$/, function (req, res) {
  res.sendFile(__dirname + req.url);
});

app.post('/generate-xml-sitemap', function (req, res) {
  SitemapService.createSitemap(req).then(function (sitemap) {
    SitemapService.upload(sitemap.toString());
    res.header('Content-Type', 'application/xml');
    res.status(200);
    res.send(sitemap.toString());
  })
});

const getRedirectPath = (urlObject) => {
  return redirectsJson[urlObject.pathname];
};

app.get(
  '*',
  auth.basicAuth(process.env.USERNAME, process.env.PASSWORD),
  function (req, res) {
    const parsed = url.parse(req.url);
    const redirectPath = getRedirectPath(parsed);
    if (redirectPath) {
      parsed.pathname = redirectPath;
      res.redirect(301, url.format(parsed));
      return;
    }

    const base = _.compact(req.url.split('/'))[0];
    if (_.includes(assets, base)) {
      res.sendFile(__dirname + req.url);
    } else {
      res.sendFile(__dirname + '/index.html');
    }
});

app.listen(port);
console.log('App listening on port %d', port);
