'use strict';

const offerSchemaPost = require(`./offer/offer-schema-post`);
const offerSchemaPut = require(`./offer/offer-schema-put`);
const commentSchemaPost = require(`./comment/comment-schema-post`);

module.exports = {
  offerSchemaPost,
  offerSchemaPut,
  commentSchemaPost
};
