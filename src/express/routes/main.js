'use strict';

const {Router} = require('express');
const {Offers} = require('../api');
const {HTTPCodes} = require('../../constants');

const mainRouter = new Router();
const offersAPI = new Offers();

mainRouter.get('/', async (req, res) => {
  const dataOffers = await offersAPI.loadOffers();

  res.status(HTTPCodes.Ok).render('main', {dataOffers});
});

module.exports = mainRouter;
