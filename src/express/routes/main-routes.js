'use strict';

const {Router} = require(`express`);

const indexRouter = new Router();

indexRouter.get(`/`, (req, res) => {
  res.render(`main`);
});
indexRouter.get(`/login`, (req, res) => {
  res.render(`login`);
});
indexRouter.get(`/category`, (req, res) => {
  res.render(`category`);
});
indexRouter.get(`/sign-up`, (req, res) => {
  res.render(`sign-up`);
});
indexRouter.get(`/ticket`, (req, res) => {
  res.render(`ticket`);
});
indexRouter.get(`/search`, (req, res) => {
  res.render(`search-result`);
});

module.exports = indexRouter;
