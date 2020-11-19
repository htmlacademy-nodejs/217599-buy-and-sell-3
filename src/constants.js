'use strict';

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;

const ExitCodes = {
  Success: 0,
  Error: 1,
};

const DefaultPorts = {
  API: 3000,
  Client: 8080,
};

const Env = {
  Development: 'development',
  Production: 'production',
};

const BASE_API_URL = `http://localhost:${DefaultPorts.API}/api`;

const HTTPCodes = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
  NotFound: 404,
  Forbidden: 403,
  Unauthorized: 401,
  InvalidRequest: 400,
  InternalServerError: 500,
  ServiceUnavailable: 503,
};

const HTTPMessages = {
  200: 'Ok',
  201: 'Created',
  204: 'No Content',
  400: 'Invalid Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};

const FilePaths = {
  Titles: './data/titles.txt',
  Descriptions: './data/descriptions.txt',
  Categories: './data/categories.txt',
  Comments: './data/comments.txt',
};
const OfferType = {
  sale: 'продам',
  offer: 'куплю',
};
const APIRequests = {
  Post: 'post',
  Put: 'put',
};

const MocksRange = Object.freeze({
  Advert: {
    Min: 1,
    Max: 1000,
  },
  Category: {
    Min: 1,
    Max: 6,
  },
  Comment: {
    Min: 1,
    Max: 9,
  },
  Title: {
    Min: 1,
    Max: 9,
  },
  Description: {
    Min: 1,
    Max: 5,
  },
  Picture: {
    Min: 1,
    Max: 16,
  },
  Avatar: {
    Min: 1,
    Max: 4,
  },
  Cost: {
    Min: 100,
    Max: 100000,
  },
  IdSize: {
    Max: 6,
  },
});

const MocksOptions = {
  FileName: `mocks.json`,
  Range: MocksRange,
};

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCodes,
  HTTPCodes,
  HTTPMessages,
  FilePaths,
  OfferType,
  MocksOptions,
  BASE_API_URL,
  DefaultPorts,
  APIRequests,
  Env,
};
