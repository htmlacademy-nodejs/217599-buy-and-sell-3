'use strict';

const {HTTPCodes} = require('../../constants');

const searchExist = (service) => async (req, res, next) => {
  const {title} = req.query;

  try {
    res.locals.definedOffers = await service.searchOffers(title);
  } catch (err) {
    return res.status(HTTPCodes.NotFound).render('error/404');
  }

  return next();
};

module.exports = searchExist;
