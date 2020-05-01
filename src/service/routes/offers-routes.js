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

offersRouter.get(`/`, (req, res, next) => {
  try {
    res.json(mockData.offers);
  } catch (err) {
    next(err);
  }
});
offersRouter.get(`/:offerId`, (req, res, next) => {
  try {
    const offerId = req.params.offerId;
    const offer = mockData.offers.find(({id}) => offerId === id);

    if (!offer) {
      res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
      return;
    }

    res.json(offer);
  } catch (err) {
    next(err);
  }
});
offersRouter.get(`/:offerId/comments`, (req, res, next) => {
  try {
    const offerId = req.params.offerId;
    const offers = mockData.offers.find(({id}) => offerId === id);

    if (!offers) {
      res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

      return;
    }

    const comments = offers.comments;

    res.json(comments);
  } catch (err) {
    next(err);
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

      res.status(HTTP_CODE.CREATED).json({id: newOffer.id});
    });
offersRouter.post(`/:offerId/comments`,
    validateBySchema(commentSchemaPost),
    (req, res, next) => validate(req, res, next, VALID_REQUEST_TEMPLATE.COMMENT.POST),
    (req, res, next) => {
      const offerId = req.params.offerId;

      try {
        const offer = mockData.offers.find(({id}) => offerId === id);

        if (!offer) {
          res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

          return;
        }

        const newComment = {
          ...req.body,
          id: nanoid(ID_SIZE)
        };

        offer.comments.push(newComment);
        res.status(HTTP_CODE.CREATED).json(newComment.id);
      } catch (err) {
        next(err);
      }
    });
offersRouter.put(`/:offerId`,
    validateBySchema(offerSchemaPut),
    (req, res, next) => validate(req, res, next, VALID_REQUEST_TEMPLATE.OFFER.PUT),
    async (req, res, next) => {
      try {
        const offerId = req.params.offerId;
        let offerIndex = mockData.offers.findIndex(({id}) => offerId === id);

        if (offerIndex === -1) {
          res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

          return;
        }

        mockData.offers[offerIndex] = {
          ...mockData.offers[offerIndex],
          ...req.body
        };

        res.json({
          ...req.body,
        });
      } catch (err) {
        next(err);
      }
    });
offersRouter.delete(`/:offerId`, (req, res, next) => {
  try {
    const offerId = req.params.offerId;
    const offer = mockData.offers.find(({id}) => offerId === id);

    if (!offer) {
      res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

      return;
    }

    mockData.offers = mockData.offers.filter(({id}) => offerId !== id);
    res.status(HTTP_CODE.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});
offersRouter.delete(`/:offerId/comments/:commentId`, async (req, res, next) => {
  try {
    const offerId = req.params.offerId;
    const commentId = req.params.commentId;
    const offer = mockData.offers.find(({id}) => offerId === id);

    if (!offer) {
      res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

      return;
    }

    const deletedComment = offer.comments.filter(({id}) => commentId === id);

    if (!deletedComment.length) {
      res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);

      return;
    }

    offer.comments = offer.comments.filter(({id}) => commentId !== id);
    res.status(HTTP_CODE.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});

module.exports = offersRouter;
