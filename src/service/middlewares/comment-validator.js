'use strict';

const {HTTPCodes, HTTPMessages} = require('../../constants');
const {arrayEquals} = require('../../utils');

const tmpPost = ['text'];

const commentValidator = (req, res, next) => {
  const {body} = req;
  const newCommentBody = body;
  const isBodyPostValid = arrayEquals(tmpPost, Object.keys(newCommentBody));

  if (!isBodyPostValid) {
    return res
      .status(HTTPCodes.InvalidRequest)
      .send(HTTPMessages[HTTPCodes.InvalidRequest]);
  }

  res.locals.newCommentBody = newCommentBody;

  return next();
};

module.exports = commentValidator;
