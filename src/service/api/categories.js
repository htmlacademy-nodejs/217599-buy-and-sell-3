'use strict';

const {Router} = require('express');
const {HTTPCodes} = require('../../constants');

const categoriesRouter = new Router();

module.exports = (app, categoriesService) => {
  app.use('/categories', categoriesRouter);

  categoriesRouter.get('/', (req, res) => {
    const categories = categoriesService.getAll();

    res.status(HTTPCodes.Ok).json(categories);
  });
};
