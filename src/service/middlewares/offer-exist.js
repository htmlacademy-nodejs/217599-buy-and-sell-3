'use strict';

const {HTTPCodes, HTTPMessages} = require('../../constants');

const offerExist = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.getOffer(offerId);

  if (!offer) {
    return res
      .status(HTTPCodes.NotFound)
      .send(HTTPMessages[HTTPCodes.NotFound]);
  }

  res.locals.offer = offer;

  return next();
};

module.exports = offerExist;
