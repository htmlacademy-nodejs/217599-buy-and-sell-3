'use strict';

const {Router} = require(`express`);

const {parseTXTFile} = require(`../utils`);
const {FILE_PATH} = require(`../constants`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await parseTXTFile(FILE_PATH.CATEGORIES);

    res.json(fileContent);
  } catch (err) {
    console.log(err);
  }
});

module.exports = categoriesRouter;
