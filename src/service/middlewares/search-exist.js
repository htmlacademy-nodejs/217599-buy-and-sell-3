'use strict';

const {HTTPCodes, HTTPMessages} = require('../../constants');

const searchExist = (service) => (req, res, next) => {
  const {title} = req.query;

  if (!title) {
    return res
      .status(HTTPCodes.InvalidRequest)
      .send(HTTPMessages[HTTPCodes.InvalidRequest]);
  }

  res.locals.offers = service.searchByTitle(title);

  return next();
};

module.exports = searchExist;
