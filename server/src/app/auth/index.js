'use strict';

const express = require('express');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const authMiddleware = require('./authMiddleware');
const startAuth = require('./startAuth');
const processAuthCallback = require('./processAuthCallback');
const refreshAuth = require('./refreshAuth');

const router = express.Router();

const area = () => {
  router.get('/', asyncWrapper(startAuth));
  router.get('/cb', asyncWrapper(processAuthCallback));
  router.get('/refresh', asyncWrapper(refreshAuth));

  return router;
};
module.exports = area;
module.exports.middleware = authMiddleware;