'use strict';

const {HTTPCodes, HTTPMessages} = require('../../constants');

const errorSwitcher = (err, res) => {
  switch (err.response.status) {
    case HTTPCodes.Unauthorized:
      res
        .status(HTTPCodes.Unauthorized)
        .send(HTTPMessages[HTTPCodes.Unauthorized]);
      break;

    case HTTPCodes.NotFound:
      res.status(HTTPCodes.NotFound).render('error/404');
      break;

    case HTTPCodes.InternalServerError:
      res.status(HTTPCodes.InternalServerError).render('error/500');
      break;
  }
};

module.exports = errorSwitcher;
