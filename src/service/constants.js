'use strict';

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const MOCKS_FILE_NAME = `mocks.json`;
const NOT_FOUND_MESSAGE = `Not found`;
const INTERNAL_SERVER_ERROR_MESSAGE = `INTERNAL_SERVER_ERROR`;
const INVALID_REQUEST_MESSAGE = `INVALID_REQUEST`;
// TODO [@Shirokuiu]: Временное решение
const mockData = {
  offers: []
};
const ExitCode = {
  success: 0,
  error: 1
};
const ID_SIZE = 6;
const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
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
const COUNT = Object.freeze({
  ADVERT: {
    MIN: 1,
    MAX: 1000
  },
  CATEGORY: {
    MIN: 1,
    MAX: 6
  },
  COMMENT: {
    MIN: 1,
    MAX: 9,
    LENGTH: {
      MIN: 20
    }
  },
  TITLE: {
    MIN: 1,
    MAX: 9,
    LENGTH: {
      MIN: 10,
      MAX: 100
    }
  },
  DESCRIPTION: {
    MIN: 1,
    MAX: 5,
    LENGTH: {
      MIN: 50,
      MAX: 1000
    }
  },
  PICTURE: {
    MIN: 1,
    MAX: 16
  },
  COST: {
    MIN: 100,
    MAX: 100000
  }
});

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
  HTTP_CODE,
  MOCKS_FILE_NAME,
  NOT_FOUND_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  INVALID_REQUEST_MESSAGE,
  FILE_PATH,
  OfferType,
  ID_SIZE,
  COUNT,
  mockData
};
