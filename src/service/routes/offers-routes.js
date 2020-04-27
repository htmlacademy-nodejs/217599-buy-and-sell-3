'use strict';

const {Router} = require(`express`);
const {nanoid} = require(`nanoid`);

const {parseJSONFile} = require(`../utils`);
const {HTTP_CODE, NOT_FOUND_MESSAGE, ID_SIZE, MOCKS_FILE_NAME} = require(`../constants`);
const {
  validateBySchema,
  validate,
  offerSchemaPost,
  offerSchemaPut,
  commentSchemaPost,
  VALID_REQUEST_TEMPLATE
} = require(`../validators/index`);

const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
  try {
    const mocks = await parseJSONFile(MOCKS_FILE_NAME);

    res.json(mocks);
  } catch (err) {
    console.error(err);
    res.status(HTTP_CODE.OK).json([]);
  }
});
offersRouter.get(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId;

  try {
    const mock = await parseJSONFile(MOCKS_FILE_NAME).then((offers) => offers.find(({id}) => offerId === id));

    if (!mock) {
      throw new Error(`Объявление отсутствует`);
    }

    res.json(mock);
  } catch (err) {
    console.error(err);
    res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
  }
});
offersRouter.get(`/:offerId/comments`, async (req, res) => {
  const offerId = req.params.offerId;

  try {
    const offers = await parseJSONFile(MOCKS_FILE_NAME).then((items) => items.find(({id}) => offerId === id));

    if (!offers) {
      throw new Error(`Объявление c комментариями не найдено`);
    }

    const comments = offers.comments;

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(HTTP_CODE.NOT_FOUND);
  }
});
offersRouter.post(`/`,
    validateBySchema(offerSchemaPost),
    (req, res, next) => validate(req, res, next, VALID_REQUEST_TEMPLATE.OFFER.POST),
    (req, res) => {
      res.status(HTTP_CODE.CREATED).json({
        ...req.body,
        id: nanoid(ID_SIZE)
      });
    });
offersRouter.post(`/:offerId/comments`,
    validateBySchema(commentSchemaPost),
    (req, res, next) => validate(req, res, next, VALID_REQUEST_TEMPLATE.COMMENT.POST),
    (req, res) => {
      res.status(HTTP_CODE.CREATED).json({
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
        const mock = await parseJSONFile(MOCKS_FILE_NAME).then((offers) => offers.find(({id}) => offerId === id));

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
    const mocks = await parseJSONFile(MOCKS_FILE_NAME)
      .then((mockItems) => mockItems.filter(({id}) => offerId !== id));

    if (!mocks) {
      throw new Error(`Объявление не удалено, так как оно не найдено`);
    }

    res.status(HTTP_CODE.NO_CONTENT).send();
  } catch (err) {
    console.log(err);
    res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
  }
});
offersRouter.delete(`/:offerId/comments/:commentId`, async (req, res) => {
  const offerId = req.params.offerId;
  const commentId = req.params.commentId;

  try {
    const offers = await parseJSONFile(MOCKS_FILE_NAME).then((offersItems) => offersItems);

    if (!offers) {
      throw new Error(`Не удалось удалить комментарий, так как объявление не найдено`);
    }

    const deletedComment = offers.slice()
      .find(({id}) => offerId === id).comments.filter(({id}) => commentId !== id);

    if (!deletedComment) {
      throw new Error(`Не удалось удалить комментарий, так как такого комментария не было найдено`);
    }

    res.status(HTTP_CODE.NO_CONTENT).send();
  } catch (err) {
    console.log(err);
    res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
  }
});

module.exports = offersRouter;
