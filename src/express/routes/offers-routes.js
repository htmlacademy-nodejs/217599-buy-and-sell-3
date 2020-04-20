'use strict';

const {Router} = require(`express`);

const offersRouter = new Router();

offersRouter.get(`/`, (req, res) => {
  res.send(`/offers`);
});
offersRouter.get(`/category/:id`, (req, res) => {
  const categoryId = +req.params.id;

  res.send(`/offers/category/${categoryId}`);
});
offersRouter.get(`/add`, (req, res) => {
  res.send(`/offers/add`);
});
offersRouter.get(`/edit/:id`, (req, res) => {
  const editId = +req.params.id;

  res.send(`/offers/edit/${editId}`);
});
offersRouter.get(`/:id`, (req, res) => {
  const offersId = +req.params.id;

  res.send(`/offers/${offersId}`);
});

module.exports = offersRouter;
