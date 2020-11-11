'use strict';

const {Router} = require('express');
const {HTTPCodes} = require('../../constants');
const {searchExist} = require('../middlewares');

const searchRouter = new Router();

module.exports = (app, searchService) => {
  app.use('/search', searchRouter);

  searchRouter.get('/', searchExist(searchService), (req, res) => {
    const {offers} = res.locals;

    res.status(HTTPCodes.Ok).json(offers);
  });
};
