'use strict';

const {validationResult} = require(`express-validator`);
const {HTTP_CODE} = require(`../constants`);
const {REQUEST_PARAM} = require(`./constants`);
const {compareArrayToAnotherArray} = require(`../utils`);

const validate = (req, res, next, options = {
  req: REQUEST_PARAM.BODY,
  tmp: undefined
}) => {
  const errors = validationResult(req);
  const extractedErrors = [];

  if (options.tmp) {
    const reqTmpArr = Object.keys(req[options.req || REQUEST_PARAM.BODY]);
    const validTmpArr = Object.keys(options.tmp);

    // [@Shirokuiu]: Пустой ли body от клиента
    if (!reqTmpArr.length) {
      extractedErrors.push({
        body: `Переданные параметры пусты`
      });

      return res.status(HTTP_CODE.INVALID_REQUEST).json({
        errors: extractedErrors,
      });
    }

    const hasInvalidTmp = compareArrayToAnotherArray(reqTmpArr, validTmpArr);

    // [@Shirokuiu]: Соответствует ли body клиента валидному шаблону
    if (hasInvalidTmp) {
      extractedErrors.push({
        body: `Переданные параметры не соответствуют валидным значениям`
      });

      return res.status(HTTP_CODE.INVALID_REQUEST).json({
        errors: extractedErrors,
      });
    }
  }

  if (errors.isEmpty()) {
    return next();
  }
  errors.array().map((err) => extractedErrors.push({[err.param]: err.msg}));

  return res.status(HTTP_CODE.INVALID_REQUEST).json({
    errors: extractedErrors,
  });
};

module.exports = validate;
