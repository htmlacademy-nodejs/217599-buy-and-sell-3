'use strict';

const {nanoid} = require('nanoid');
const {MocksOptions} = require('../../constants');

class Offers {
  constructor(data) {
    this._offers = data;
  }

  getAll() {
    return this._offers;
  }

  getOffer(offerId) {
    return this._offers.find(({id}) => id === offerId);
  }

  getComments(offerId) {
    const offer = this._offers.find((offerItem) => offerItem.id === offerId);

    if (!offer || !offer.comments.length) {
      return undefined;
    }

    return offer.comments;
  }

  getComment(offerId, commentId) {
    const offer = this._offers.find(({id}) => offerId === id);

    return offer.comments.find(({id}) => commentId === id);
  }

  createOffer(body) {
    const id = nanoid(MocksOptions.Range.IdSize.Max);

    const newOffer = {
      ...body,
      id,
      comments: [],
    };

    this._offers.push(newOffer);

    return id;
  }

  addComment(body, offerId) {
    const offerIndex = this._getOfferIndex(offerId);
    const id = nanoid(MocksOptions.Range.IdSize.Max);

    const newComment = {
      ...body,
      id,
    };

    this._offers[offerIndex].comments.push(newComment);

    return id;
  }

  editOffer(oldOffer, body) {
    const offerIndex = this._getOfferIndex(oldOffer.id);

    this._offers[offerIndex] = {
      ...oldOffer,
      ...body,
    };
  }

  removeOffer(offerId) {
    this._offers = this._offers.filter(({id}) => offerId !== id);
  }

  removeComment(offer, commentId) {
    const offerIndex = this._getOfferIndex(offer.id);

    this._offers[offerIndex].comments = this._offers[
      offerIndex
    ].comments.filter(({id}) => id !== commentId);
  }

  _getOfferIndex(offerId) {
    return this._offers.findIndex(({id}) => id === offerId);
  }
}

module.exports = Offers;
