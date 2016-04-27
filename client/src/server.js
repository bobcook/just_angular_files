const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const redirectsJson = require('./redirects.json');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(require('prerender-node')
  .set('prerenderToken', process.env.PRERENDER_TOKEN));

const assets = ['styles', 'scripts', 'app', 'robots.txt']

app.get('*', function (req, res) {
  const redirectUrl = redirectsJson[req.url];
  if (redirectUrl) {
    res.redirect(302, redirectUrl);
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
