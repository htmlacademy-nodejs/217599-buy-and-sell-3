'use strict';

const {validationResult} = require(`express-validator`);
const {HTTP_CODE} = require(`../constants`);
const {REQUEST_PARAM} = require(`./constants`);
const {compareArrayToAnotherArray, uniqueObjArr} = require(`../utils`);

const validate = (req, res, next, options = {
  req: REQUEST_PARAM.BODY,
  tmp: undefined
}) => {
  const errors = validationResult(req);
  let extractedErrors = [{
    invalid: [{
      key: ``,
      value: ``
    }],
    msg: ``,
    valid: ``
  }];

  if (options.tmp) {
    const reqTmpArr = Object.keys(req[options.req || REQUEST_PARAM.BODY]);
    const validTmpArr = Object.keys(options.tmp);

    const hasInvalidTmp = Boolean(compareArrayToAnotherArray(reqTmpArr, validTmpArr).length);

    // NOTE [@Shirokuiu]: Соответствует ли body клиента валидному шаблону
    if (hasInvalidTmp) {
      extractedErrors = {
        invalid: compareArrayToAnotherArray(reqTmpArr, validTmpArr).map((item) => ({
          key: item,
          value: req[options.req || REQUEST_PARAM.BODY][item]
        })),
        msg: `Переданные параметры не соответствуют валидным значениям`,
        valid: options.tmp
      };

      return res.status(HTTP_CODE.INVALID_REQUEST).json({
        errors: extractedErrors,
      });
    }
  }

  if (errors.isEmpty()) {
    return next();
  }

  // NOTE [@Shirokuiu]: Чтобы ключи ошибок не повторялись
  extractedErrors = uniqueObjArr(errors.array(), `param`)
    .map(({param, msg}) => ({
      invalid: [{
        key: param,
        value: req[options.req || REQUEST_PARAM.BODY][param]
      }], msg, valid: options.tmp[param]
    }));

  return res.status(HTTP_CODE.INVALID_REQUEST).json({
    errors: extractedErrors,
  });
};

module.exports = validate;
