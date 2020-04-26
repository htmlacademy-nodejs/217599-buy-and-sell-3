'use strict';

const validateBySchema = require(`./validate-by-schema`);
const {offerSchemaPost, offerSchemaPut, commentSchemaPost} = require(`./schema/index`);
const validate = require(`./validate`);
const {VALID_REQUEST_TEMPLATE} = require(`./constants`);

module.exports = {
  validateBySchema,
  validate,
  offerSchemaPost,
  offerSchemaPut,
  commentSchemaPost,
  VALID_REQUEST_TEMPLATE
};
