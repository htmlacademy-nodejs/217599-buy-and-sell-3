'use strict';

const {Router} = require(`express`);

const {VALID_REQUEST_TEMPLATE, ERROR_TEMPLATE} = require(`../validators/constants`);
const {
  HTTP_CODE,
  NOT_FOUND_MESSAGE
} = require(`../constants`);
const {compareArrayToAnotherArray, mockData} = require(`../utils`);

const searchRouter = new Router();

const validQueryTmp = Object.keys(VALID_REQUEST_TEMPLATE.SEARCH);

searchRouter.get(`/`, async (req, res) => {
  const reqQuery = req.query;
  const reqQueryTmp = Object.keys(reqQuery);

  try {
    const isQueryInvalid = compareArrayToAnotherArray(reqQueryTmp, validQueryTmp);

    if (isQueryInvalid) {
      ERROR_TEMPLATE.errors.push({
        search: `Передан не валидный параметр поиска`
      });
      res.status(HTTP_CODE.INVALID_REQUEST).send(ERROR_TEMPLATE);
    }

    // [@Shirokuiu]: Если параметр пустой
    if (!reqQueryTmp.length || !reqQuery.query.trim().length) {
      res.status(HTTP_CODE.OK).json([]);

      return;
    }

    const foundOffers = mockData.offers
      .filter(({title}) => title.toLowerCase().includes(reqQuery.query.toLowerCase()));

    res.json(foundOffers);
  } catch (err) {
    res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
  }
});

module.exports = searchRouter;
