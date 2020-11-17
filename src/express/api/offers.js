'use strict';

const api = require('./api-config');
const {OfferType} = require('../../constants');

class Offers {
  static async loadOffers() {
    const {data: offers} = await api.get('offers');

    return offers.map((offer) => ({
      ...offer,
      classMod: offer.picture.slice(4, 6), // Временное решение, так как нужно для css модификатора (спросил в группе а нужен ли он)
      offerType: OfferType[offer.type],
    }));
  }

  static async loadOffer(id) {
    const {data: offer} = await api.get(`offers/${id}`);

    return offer;
  }

  static async searchOffers(searchStr) {
    const {data: offers} = await api.get('search', {
      params: {
        title: searchStr,
      },
    });

    return offers;
  }

  static async createOffer(body) {
    const {data: id} = await api.post('offers', body);

    return id;
  }
}

module.exports = Offers;
