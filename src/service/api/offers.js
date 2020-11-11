'use strict';

const {Router} = require('express');
const {HTTPCodes, APIRequests} = require('../../constants');
const {
  offerExist,
  commentsExist,
  offerValidator,
  commentExist,
  commentValidator,
} = require('../middlewares');

const offersRouter = new Router();

module.exports = (app, offersService) => {
  app.use('/offers', offersRouter);

  offersRouter.get('/', (req, res) => {
    const offers = offersService.getAll();

    res.status(HTTPCodes.Ok).json(offers);
  });

  offersRouter.get('/:offerId', offerExist(offersService), (req, res) => {
    const {offer} = res.locals;

    res.status(HTTPCodes.Ok).json(offer);
  });

  offersRouter.get(
    '/:offerId/comments',
    commentsExist(offersService),
    (req, res) => {
      const {comments} = res.locals;

      res.status(HTTPCodes.Ok).json(comments);
    },
  );

  offersRouter.post('/', offerValidator(APIRequests.Post), (req, res) => {
    const {newOfferBody} = res.locals;
    const newOfferId = offersService.createOffer(newOfferBody);

    res.status(HTTPCodes.Created).json(newOfferId);
  });

  offersRouter.post(
    '/:offerId/comments',
    [offerExist(offersService), commentsExist(offersService), commentValidator],
    (req, res) => {
      const {offerId} = req.params;
      const {newCommentBody} = res.locals;

      const id = offersService.addComment(newCommentBody, offerId);

      res.status(HTTPCodes.Created).json(id);
    },
  );

  offersRouter.put(
    '/:offerId',
    [offerExist(offersService), offerValidator(APIRequests.Put)],
    (req, res) => {
      const {editedOfferBody, oldOffer} = res.locals;

      offersService.editOffer(oldOffer, editedOfferBody);

      res.status(HTTPCodes.NoContent).send();
    },
  );

  offersRouter.delete('/:offerId', offerExist(offersService), (req, res) => {
    const {offer} = res.locals;

    offersService.removeOffer(offer.id);

    res.status(HTTPCodes.NoContent).send();
  });

  offersRouter.delete(
    '/:offerId/comments/:commentId',
    [
      offerExist(offersService),
      commentsExist(offersService),
      commentExist(offersService),
    ],
    (req, res) => {
      const {commentId} = req.params;
      const {offer} = res.locals;

      offersService.removeComment(offer, commentId);

      res.status(HTTPCodes.NoContent).send();
    },
  );
};
