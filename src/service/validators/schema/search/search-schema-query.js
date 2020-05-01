'use strict';

const searchSchemaQuery = {
  query: {
    exists: {
      errorMessage: `Поле обязательно`
    }
  }
};

module.exports = searchSchemaQuery;
