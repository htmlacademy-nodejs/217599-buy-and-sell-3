'use strict';

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const ExitCode = {
  success: 0,
  error: 1
};
const HTTP_CODE = {
  OK: 200,
  NO_CONTENT_IN_RESPONSE: 204,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
  HTTP_CODE
};
