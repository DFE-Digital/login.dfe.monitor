'use strict';

const express = require('express');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const getJobCounts = require('./getJobCounts');
const listCategoriesAndTypes = require('./listCategoriesAndTypes');
const listJobsOfType = require('./listJobsOfType');

const router = express.Router();

const area = () => {
  router.get('/', asyncWrapper(getJobCounts));
  router.get('/categories', asyncWrapper(listCategoriesAndTypes));
  router.get('/types/:typeId', asyncWrapper(listJobsOfType));

  return router;
};
module.exports = area;