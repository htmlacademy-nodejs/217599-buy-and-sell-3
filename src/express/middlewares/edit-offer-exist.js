'use strict';

const {HTTPCodes} = require('../../constants');

const editOfferExist = (offersAPI, categoriesAPI) => async (req, res, next) => {
  const {id} = req.params;

  try {
    const [dataOffer, categories] = await Promise.all([
      offersAPI.loadOffer(id),
      categoriesAPI.loadAll(),
    ]);

    res.locals = {
      dataOffer,
      categories,
    };
  } catch (err) {
    return res.status(HTTPCodes.NotFound).render('error/404');
  }

  return next();
};

module.exports = editOfferExist;
