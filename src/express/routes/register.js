'use strict';

const {Router} = require('express');
const {HTTPCodes} = require('../../constants');

const registerRouter = new Router();

registerRouter.get('/', (req, res) => {
  res.status(HTTPCodes.Ok).render('sign-up');
});

module.exports = registerRouter;
