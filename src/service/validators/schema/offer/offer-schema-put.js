'use strict';

const {parseTXTFile, compareArrayToAnotherArray, checkDuplicateInArray, checkStrBySpace} = require(`../../../utils`);
const {FILE_PATH, OfferType} = require(`../../../constants`);

const offerSchemaPut = {
  type: {
    isEmpty: {
      errorMessage: `Поле не может быть пустым`,
      negated: true,
      options: {
        ignore_whitespace: true // eslint-disable-line camelcase
      }
    },
    custom: {
      options: (typeValue) => {
        const hasSpace = checkStrBySpace(typeValue);
        const invalidType = !Object.keys(OfferType).includes(typeValue.trim());

        if (invalidType) {
          throw new Error(`Передан не правильный тип объявления`);
        }

        if (hasSpace) {
          throw new Error(`Значение не должно содержать пробелов`);
        }

        return true;
      }
    },
    optional: true
  },
  category: {
    isArray: {
      errorMessage: `Категория должна быть массивом, от 1 до 6 эллементов`,
      options: {
        min: 1,
        max: 6
      }
    },
    custom: {
      options: async (postCategories) => {
        if (!postCategories) {
          return;
        }

        const categories = await parseTXTFile(FILE_PATH.CATEGORIES);
        const isDuplicate = checkDuplicateInArray(postCategories);
        const hasInvalidCategories = compareArrayToAnotherArray(postCategories, categories);

        if (isDuplicate) {
          throw new Error(`В категории должны быть уникальные значения`);
        }

        if (hasInvalidCategories) {
          throw new Error(`Категория не соответствует валидным значениям`);
        }

        return true; // eslint-disable-line consistent-return
      }
    },
    optional: true
  },
  picture: {
    isEmpty: {
      errorMessage: `Укажите картинку`,
      negated: true,
      options: {
        ignore_whitespace: true // eslint-disable-line camelcase
      }
    },
    escape: true,
    optional: true
  },
  description: {
    isLength: {
      errorMessage: `Текст объявления. Минимум 50 символов, максимум 1000`,
      options: {
        min: 50,
        max: 1000
      }
    },
    escape: true,
    optional: true
  },
  title: {
    isLength: {
      errorMessage: `Заголовок объявления. Минимум 10 символов, максимум 100`,
      options: {
        min: 10,
        max: 100
      }
    },
    escape: true,
    optional: true
  },
  sum: {
    isInt: {
      options: {
        min: 100
      },
      errorMessage: `Сумма должна быть c минимальным числом 100`,
    },
    toInt: true,
    optional: true
  }
};

module.exports = offerSchemaPut;
