'use strict';

const {Router} = require(`express`);

const indexRouter = new Router();

indexRouter.get(`/`, (req, res) => {
  res.send(`/index`);
});

module.exports = indexRouter;
