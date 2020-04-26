'use strict';

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const MOCKS_FILE_NAME = `mocks.json`;
const NOT_FOUND_MESSAGE = `Not found`;
const INTERNAL_SERVER_ERROR_MESSAGE = `INTERNAL_SERVER_ERROR`;
const INVALID_REQUEST_MESSAGE = `INVALID_REQUEST`;
const QUERY_STRING_EMPTY_MESSAGE = `QUERY_STRING_IS_EMPTY`;
const ExitCode = {
  success: 0,
  error: 1
};
const ID_SIZE = 6;
const HTTP_CODE = {
  OK: 200,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  INVALID_REQUEST: 400
};
const FILE_PATH = {
  TITLES: `./data/titles.txt`,
  DESCRIPTIONS: `./data/descriptions.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`
};
const OfferType = {
  sale: `sale`,
  offer: `offer`
};

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
  HTTP_CODE,
  MOCKS_FILE_NAME,
  NOT_FOUND_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  INVALID_REQUEST_MESSAGE,
  QUERY_STRING_EMPTY_MESSAGE,
  FILE_PATH,
  OfferType,
  ID_SIZE
};
