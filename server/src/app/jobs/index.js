'use strict';

const express = require('express');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const listCategoriesAndTypes = require('./listCategoriesAndTypes');

const router = express.Router();

const area = () => {
  router.get('/categories', asyncWrapper(listCategoriesAndTypes));

  return router;
};
module.exports = area;