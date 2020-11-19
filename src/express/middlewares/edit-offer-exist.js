'use strict';

const {errorSwitcher} = require('../lib');

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
    return errorSwitcher(err, res);
  }

  return next();
};

module.exports = editOfferExist;
