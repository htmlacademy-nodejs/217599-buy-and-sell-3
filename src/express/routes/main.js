'use strict';

const {Router} = require('express');
const {Offers: OffersAPI} = require('../api');
const {HTTPCodes} = require('../../constants');

const mainRouter = new Router();

mainRouter.get('/', async (req, res) => {
  const dataOffers = await OffersAPI.loadOffers();

  res.status(HTTPCodes.Ok).render('main', {dataOffers});
});

module.exports = mainRouter;
