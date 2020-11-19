'use strict';

const {errorSwitcher} = require('../lib');

const searchExist = (service) => async (req, res, next) => {
  const {title} = req.query;

  try {
    res.locals.definedOffers = await service.searchOffers(title);
  } catch (err) {
    return errorSwitcher(err, res);
  }

  return next();
};

module.exports = searchExist;
