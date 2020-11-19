'use strict';

const {errorSwitcher} = require('../lib');

const offerExist = (service) => async (req, res, next) => {
  const {id} = req.params;

  try {
    res.locals.dataOffer = await service.loadOffer(id);
  } catch (err) {
    return errorSwitcher(err, res);
  }

  return next();
};

module.exports = offerExist;
