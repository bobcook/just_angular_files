'use strict'

const basicAuth = require('basic-auth');

module.exports = {
  basicAuth: function(username, password) {
    if (process.env.ENVIRONMENT === 'production') {
      return function(req, res, next) {
        next();
      };
    } else {
      return function(req, res, next) {
        const user = basicAuth(req);

        if (!user || user.name !== username || user.pass !== password) {
          res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
          return res.send(401);
        }

        next();
      };
    }
  }
};
