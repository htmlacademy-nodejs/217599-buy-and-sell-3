'use strict';

const {Router} = require(`express`);

const errorRouter = new Router();

errorRouter.get(`/500`, (req, res) => {
  res.render(`errors/500`);
});
errorRouter.get(`/404`, (req, res) => {
  res.render(`errors/404`);
});

module.exports = errorRouter;
