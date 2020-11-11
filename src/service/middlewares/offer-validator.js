'use strict';

const {HTTPCodes, HTTPMessages, APIRequests} = require('../../constants');
const {compareArrayToAnotherArray} = require('../../utils');

const tmpPost = [
  'description',
  'picture',
  'title',
  'type',
  'sum',
  'categories',
];

const tmpPut = ['category', 'description', 'picture', 'title', 'type', 'sum'];

const offerValidator = (requests) => (req, res, next) => {
  const {body} = req;
  const {offer} = res.locals;

  switch (requests) {
    case APIRequests.Post:
      const newOfferBody = body;
      const isBodyPostValid = tmpPost.every((key) =>
        Object.keys(newOfferBody).includes(key),
      );

      if (!isBodyPostValid) {
        return res
          .status(HTTPCodes.InvalidRequest)
          .send(HTTPMessages[HTTPCodes.InvalidRequest]);
      }

      res.locals.newOfferBody = newOfferBody;

      break;
    case APIRequests.Put:
      const editedOfferBody = body;
      const isBodyPutInvalid = Boolean(
        compareArrayToAnotherArray(Object.keys(body), tmpPut).length,
      );

      if (isBodyPutInvalid) {
        return res
          .status(HTTPCodes.InvalidRequest)
          .send(HTTPMessages[HTTPCodes.InvalidRequest]);
      }

      res.locals = {
        editedOfferBody,
        oldOffer: offer,
      };

      break;
  }

  return next();
};

module.exports = offerValidator;
