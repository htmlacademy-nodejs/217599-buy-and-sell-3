'use strict';

const {Router} = require(`express`);

const {VALID_REQUEST_TEMPLATE} = require(`../validators/constants`);
const {
  HTTP_CODE,
  INVALID_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  QUERY_STRING_EMPTY_MESSAGE
} = require(`../constants`);
const {compareArrayToAnotherArray, mockData} = require(`../utils`);

const searchRouter = new Router();

searchRouter.get(`/`, async (req, res) => {
  const reqQuery = req.query;
  const reqQueryTmp = Object.keys(reqQuery);

  try {
    const validQueryTmp = Object.keys(VALID_REQUEST_TEMPLATE.SEARCH);
    const isQueryInValid = compareArrayToAnotherArray(reqQueryTmp, validQueryTmp);

    if (isQueryInValid) {
      throw new Error(INVALID_REQUEST_MESSAGE);
    }

    // [@Shirokuiu]: Если валидный пустой параметр
    if (!reqQueryTmp.length || !reqQuery.query.trim().length) {
      throw new Error(QUERY_STRING_EMPTY_MESSAGE);
    }

    const foundOffers = mockData.offers
      .filter(({title}) => title.toLowerCase().includes(reqQuery.query.toLowerCase()));

    console.log(mockData.offers);

    res.json(foundOffers);
  } catch (err) {
    const isNoFile = err.message.includes(`ENOENT`);

    if (isNoFile) {
      res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
    } else {
      res.status(HTTP_CODE.INVALID_REQUEST).send(err.message);
    }
  }
});

module.exports = searchRouter;
