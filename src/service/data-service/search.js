'use strict';

class Search {
  constructor(data) {
    this._offers = data;
  }

  searchByTitle(searchStr) {
    return this._offers.filter((offer) =>
      offer.title.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase()),
    );
  }
}

module.exports = Search;
