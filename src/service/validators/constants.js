'use strict';

const VALID_REQUEST_TEMPLATE = {
  OFFER: {
    POST: {
      description: ``,
      picture: ``,
      title: ``,
      type: ``,
      sum: 0,
      category: []
    },
    PUT: {
      description: ``,
      picture: ``,
      title: ``,
      type: ``,
      sum: 0,
      category: []
    }
  },
  COMMENT: {
    POST: {
      text: ``
    }
  },
  SEARCH: {
    QUERY: {
      GET: {
        query: ``
      }
    }
  }
};

const REQUEST_PARAM = {
  BODY: `body`,
  QUERY: `query`
};

module.exports = {
  VALID_REQUEST_TEMPLATE,
  REQUEST_PARAM
};
