'use strict';

const api = require('./api-config');

class Categories {
  static async loadAll() {
    const {data: categories} = await api.get('categories');

    return categories;
  }
}

module.exports = Categories;
