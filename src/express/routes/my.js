'use strict';

const {Router} = require('express');
const {HTTPCodes} = require('../../constants');
const {Offers: OffersAPI} = require('../api');

const myRouter = new Router();

myRouter.get('/', async (req, res) => {
  const dataOffers = await OffersAPI.loadOffers();

  res.status(HTTPCodes.Ok).render('my-tickets', {dataOffers});
});

myRouter.get('/comments', async (req, res) => {
  const dataOffers = await OffersAPI.loadOffers();

  res
    .status(HTTPCodes.Ok)
    .render('comments', {dataOffers: dataOffers.slice(0, 3)});
});

module.exports = myRouter;
