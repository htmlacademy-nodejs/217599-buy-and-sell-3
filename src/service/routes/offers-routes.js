'use strict';

const {Router} = require(`express`);
const {nanoid} = require(`nanoid`);

const {mockData} = require(`../utils`);
const {HTTP_CODE, NOT_FOUND_MESSAGE, ID_SIZE} = require(`../constants`);
const {
  validateBySchema,
  validate,
  offerSchemaPost,
  offerSchemaPut,
  commentSchemaPost,
  VALID_REQUEST_TEMPLATE
} = require(`../validators/index`);

const offersRouter = new Router();

offersRouter.get(`/`, (req, res) => {
  res.json(mockData.offers);
});
offersRouter.get(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId;

  try {
    const offer = mockData.offers.find(({id}) => offerId === id);

    if (!offer) {
      throw new Error(`Объявление отсутствует`);
    }

    res.json(offer);
  } catch (err) {
    console.error(err);
    res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
  }
});
offersRouter.get(`/:offerId/comments`, async (req, res) => {
  const offerId = req.params.offerId;

  try {
    const offers = mockData.offers.find(({id}) => offerId === id);

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
      const newOffer = {
        ...req.body,
        comments: [],
        id: nanoid(ID_SIZE)
      };

      mockData.offers.push(newOffer);

      res.status(HTTP_CODE.CREATED).json(newOffer.id);
    });
offersRouter.post(`/:offerId/comments`,
    validateBySchema(commentSchemaPost),
    (req, res, next) => validate(req, res, next, VALID_REQUEST_TEMPLATE.COMMENT.POST),
    (req, res) => {
      const offerId = req.params.offerId;

      try {
        const offer = mockData.offers.find(({id}) => offerId === id);

        if (!offer) {
          throw new Error(`Невозможно добавить комментарий, так как объявление не найдено`);
        }

        const newComment = {
          ...req.body,
          id: nanoid(ID_SIZE)
        };

        offer.comments.push(newComment);
        res.status(HTTP_CODE.CREATED).json(newComment.id);
      } catch (err) {
        res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
      }
    });
offersRouter.put(`/:offerId`,
    validateBySchema(offerSchemaPut),
    (req, res, next) => validate(req, res, next, VALID_REQUEST_TEMPLATE.OFFER.PUT),
    async (req, res) => {
      const offerId = req.params.offerId;

      try {
        let offerIndex = mockData.offers.findIndex(({id}) => offerId === id);

        if (offerIndex === -1) {
          throw new Error(`Объявление отсутствует`);
        }

        mockData.offers[offerIndex] = {
          ...mockData.offers[offerIndex],
          ...req.body
        };

        res.json({
          ...req.body,
        });
      } catch (err) {
        console.log(err);
        res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
      }
    });
offersRouter.delete(`/:offerId`, async (req, res) => {
  const offerId = req.params.offerId;

  try {
    const offer = mockData.offers.find(({id}) => offerId === id);

    if (!offer) {
      throw new Error(`Объявление не удалено, так как оно не найдено`);
    }

    mockData.offers = mockData.offers.filter(({id}) => offerId !== id);
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
    const offer = mockData.offers.find(({id}) => offerId === id);

    if (!offer) {
      throw new Error(`Не удалось удалить комментарий, так как объявление не найдено`);
    }

    const deletedComment = offer.comments.filter(({id}) => commentId === id);

    if (!deletedComment) {
      throw new Error(`Не удалось удалить комментарий, так как такого комментария не было найдено`);
    }

    offer.comments = offer.comments.filter(({id}) => commentId !== id);
    res.status(HTTP_CODE.NO_CONTENT).send();
  } catch (err) {
    console.log(err);
    res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
  }
});

module.exports = offersRouter;
