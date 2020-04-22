'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => {
  res.send(`/my`);
});
myRouter.get(`/tickets`, (req, res) => {
  res.render(`my/my-tickets`);
});
myRouter.get(`/new`, (req, res) => {
  res.render(`my/my-new-ticket`);
});
myRouter.get(`/edit`, (req, res) => {
  res.render(`my/my-ticket-edit`);
});
myRouter.get(`/comments`, (req, res) => {
  res.render(`my/comments`);
});

module.exports = myRouter;
