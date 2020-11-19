'use strict';

const {uniquerArr} = require('../../utils');

class Categories {
  constructor(data) {
    this._offers = data;
  }

  getAll() {
    return uniquerArr(
      [...this._offers].reduce(
        (acc, value) => [...acc, ...value.categories],
        [],
      ),
    );
  }
}

module.exports = Categories;
