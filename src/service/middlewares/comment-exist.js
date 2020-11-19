'use strict';

const {HTTPCodes, HTTPMessages} = require('../../constants');

const commentExist = (service) => (req, res, next) => {
  const {offerId, commentId} = req.params;

  const comment = service.getComment(offerId, commentId);

  if (!comment) {
    return res
      .status(HTTPCodes.NotFound)
      .send(HTTPMessages[HTTPCodes.NotFound]);
  }

  res.locals.comment = comment;

  return next();
};

module.exports = commentExist;
