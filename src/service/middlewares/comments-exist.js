'use strict';

const {HTTPCodes, HTTPMessages} = require('../../constants');

const commentsExist = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const comments = service.getComments(offerId);

  if (!comments) {
    return res
      .status(HTTPCodes.NotFound)
      .send(HTTPMessages[HTTPCodes.NotFound]);
  }

  res.locals.comments = comments;

  return next();
};

module.exports = commentsExist;
