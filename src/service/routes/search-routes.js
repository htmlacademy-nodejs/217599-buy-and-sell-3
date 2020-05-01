'use strict';

const {Router} = require(`express`);

const {HTTP_CODE, mockData} = require(`../constants`);
const {validateBySchema, validate, searchSchemaQuery, VALID_REQUEST_TEMPLATE} = require(`../validators/index`);
const {REQUEST_PARAM} = require(`../validators/constants`);

const searchRouter = new Router();

searchRouter.get(`/`,
    validateBySchema(searchSchemaQuery),
    (req, res, next) => validate(req, res, next, {
      req: REQUEST_PARAM.QUERY,
      tmp: VALID_REQUEST_TEMPLATE.SEARCH.QUERY.GET
    }),
    (req, res, next) => {
      try {
        const reqQueryStr = req.query.query;

        if (!reqQueryStr.trim().length) {
          res.status(HTTP_CODE.OK).json([]);

          return;
        }

        const filteredOffers = mockData.offers.slice()
          .filter(({title}) => title.toLowerCase().includes(reqQueryStr.toLowerCase()));

        res.status(HTTP_CODE.OK).json(filteredOffers);
      } catch (err) {
        next(err);
      }
    });

module.exports = searchRouter;
