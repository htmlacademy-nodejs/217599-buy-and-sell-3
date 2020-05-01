'use strict';

const {checkSchema} = require(`express-validator`);

const validateBySchema = (schema) => {
  return checkSchema(schema);
};

module.exports = validateBySchema;
