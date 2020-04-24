'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;

const offersRouter = new Router();
const {HTTP_CODE} = require(`../constants`);
const FILENAME = `mocks.json`;

offersRouter.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME, `utf8`);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    console.error(err);
    res.status(HTTP_CODE.OK).json([]);
  }
});

module.exports = offersRouter;
