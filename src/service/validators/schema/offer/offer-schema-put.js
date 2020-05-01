'use strict';

const {parseTXTFile, compareArrayToAnotherArray, checkDuplicateInArray, checkStrBySpace} = require(`../../../utils`);
const {FILE_PATH, OfferType, COUNT} = require(`../../../constants`);

const offerSchemaPut = {
  type: {
    isEmpty: {
      errorMessage: `Поле не может быть пустым`,
      negated: true,
      options: {
        ignore_whitespace: true // eslint-disable-line camelcase
      }
    },
    isIn: {
      options: [Object.values(OfferType)],
      errorMessage: `Передан не правильный тип объявления`
    },
    custom: {
      options: (typeValue) => {
        const hasSpace = checkStrBySpace(typeValue);

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
      errorMessage: `Категория должна быть массивом, от ${COUNT.CATEGORY.MIN} до ${COUNT.CATEGORY.MAX} эллементов`,
      options: {
        min: COUNT.CATEGORY.MIN,
        max: COUNT.CATEGORY.MAX
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
      errorMessage:
        `Текст объявления. Минимум ${COUNT.DESCRIPTION.LENGTH.MIN} символов, максимум ${COUNT.DESCRIPTION.LENGTH.MAX}`,
      options: {
        min: COUNT.DESCRIPTION.LENGTH.MIN,
        max: COUNT.DESCRIPTION.LENGTH.MAX
      }
    },
    escape: true,
    optional: true
  },
  title: {
    isLength: {
      errorMessage:
        `Заголовок объявления. Минимум ${COUNT.TITLE.LENGTH.MIN} символов, максимум ${COUNT.TITLE.LENGTH.MAX}`,
      options: {
        min: COUNT.TITLE.LENGTH.MIN,
        max: COUNT.TITLE.LENGTH.MAX
      }
    },
    escape: true,
    optional: true
  },
  sum: {
    isInt: {
      options: {
        min: COUNT.COST.MIN
      },
      errorMessage: `Сумма должна быть c минимальным числом ${COUNT.COST.MIN}`,
    },
    toInt: true,
    optional: true
  }
};

module.exports = offerSchemaPut;
