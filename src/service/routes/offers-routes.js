'use strict';

const {Router} = require(`express`);
const {nanoid} = require(`nanoid`);

const {parseJSONFile} = require(`../utils`);
const {HTTP_CODE, NOT_FOUND_MESSAGE, ID_SIZE} = require(`../constants`);
const {validateBySchema, validate, offerSchemaPost, offerSchemaPut, VALID_REQUEST_TEMPLATE} = require(`../validators/index`);

const offersRouter = new Router();
const FILENAME = `mocks.json`;

offersRouter.get(`/`, async (req, res) => {
  try {
    const mocks = await parseJSONFile(FILENAME);

    res.json(mocks);
  } catch (err) {
    console.error(err);
    res.status(HTTP_CODE.OK).json([]);
  }
});
offersRouter.get(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId;

  try {
    const mock = await parseJSONFile(FILENAME).then((offers) => offers.find(({id}) => offerId === id));

    if (!mock) {
      throw new Error(`Объявление отсутствует`);
    }

    res.json(mock);
  } catch (err) {
    console.error(err);
    res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
  }
});
offersRouter.post(`/`, validateBySchema(offerSchemaPost),
    (req, res, next) => validate(req, res, next, VALID_REQUEST_TEMPLATE.OFFER.POST),
    (req, res) => {
      res.json({
        ...req.body,
        id: nanoid(ID_SIZE)
      });
    });
offersRouter.put(`/:offerId`,
    validateBySchema(offerSchemaPut),
    (req, res, next) => validate(req, res, next, VALID_REQUEST_TEMPLATE.OFFER.PUT),
    async (req, res) => {
      const offerId = req.params.offerId;

      try {
        const mock = await parseJSONFile(FILENAME).then((offers) => offers.find(({id}) => offerId === id));

        if (!mock) {
          throw new Error(`Объявление отсутствует`);
        }

        res.json({
          ...mock,
          ...req.body
        });
      } catch (err) {
        console.log(err);
        res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
      }
    });
offersRouter.delete(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId;

  try {
    const mocks = await parseJSONFile(FILENAME)
      .then((mockItems) => mockItems.slice().filter(({id}) => offerId !== id));

    if (!mocks) {
      throw new Error(`Объявление не удалено, так как оно не найдено`);
    }

    res.json(mocks);
  } catch (err) {
    console.log(err);
    res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
  }
});

module.exports = offersRouter;
