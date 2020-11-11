'use strict';

const api = require('./api-config');

class Categories {
  async loadAll() {
    const {data: categories} = await api.get('categories');

    return categories;
  }
}

module.exports = Categories;
