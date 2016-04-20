'use strict'

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const SitemapService = require('./lib/services/sitemap-service')

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(require('prerender-node')
  .set('prerenderToken', process.env.PRERENDER_TOKEN));

const assets = ['styles', 'scripts', 'app', 'robots.txt'];

app.get('/sitemap.xml', function (req, res) {
  res.redirect(process.env.SITEMAP_S3_LOCATION);
});

app.post('/generate-xml-sitemap', function (req, res) {
  SitemapService.createSitemap(req).then(function (sitemap) {
    SitemapService.upload(sitemap.toString());
    res.header('Content-Type', 'application/xml');
    res.status(200);
    res.send(sitemap.toString());
  })
});

app.get('*', function (req, res) {
  const base = _.compact(req.url.split('/'))[0];
  if (_.includes(assets, base)) {
    res.sendFile(__dirname + req.url);
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});

app.listen(port);
console.log('App listening on port %d', port);