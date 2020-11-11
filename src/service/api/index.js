'use strict';

const {Router} = require('express');
const {getMockData} = require('../lib');
const {
  OfferService,
  CategoriesService,
  SearchService,
} = require('../data-service');
const offersRoutes = require('./offers');
const categoriesRoutes = require('./categories');
const searchRoutes = require('./search');

const apiRouter = new Router();

(async () => {
  const offersData = await getMockData();

  offersRoutes(apiRouter, new OfferService(offersData));
  categoriesRoutes(apiRouter, new CategoriesService(offersData));
  searchRoutes(apiRouter, new SearchService(offersData));
})();

module.exports = apiRouter;
