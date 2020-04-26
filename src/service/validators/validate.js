'use strict';

const {validationResult} = require(`express-validator`);
const {HTTP_CODE} = require(`../constants`);
const {checkArrayToAnotherArray} = require(`../utils`);

const validate = (req, res, next, validTmp = undefined) => {
  const errors = validationResult(req);
  const extractedErrors = [];

  if (validTmp) {
    const postTmpArr = Object.keys(req.body);
    const validTmpArr = Object.keys(validTmp);

    // [@Shirokuiu]: Пустой ли body от клиента
    if (!postTmpArr.length) {
      extractedErrors.push({
        body: `Переданные параметры пусты`
      });

      return res.status(HTTP_CODE.INVALID_REQUEST).json({
        errors: extractedErrors,
      });
    }

    const hasInvalidTmp = checkArrayToAnotherArray(postTmpArr, validTmpArr);

    // [@Shirokuiu]: Соответствует ли body клиента валидному шаблону
    if (hasInvalidTmp) {
      extractedErrors.push({
        body: `Переданные параметры не соответствуют шаблону`
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
