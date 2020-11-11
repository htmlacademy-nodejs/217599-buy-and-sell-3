'use strict';

const {HTTPCodes} = require('../../constants');

const offerExist = (service) => async (req, res, next) => {
  const {id} = req.params;

  try {
    res.locals.dataOffer = await service.loadOffer(id);
  } catch (err) {
    return res.status(HTTPCodes.NotFound).render('error/404');
  }

  return next();
};

module.exports = offerExist;
