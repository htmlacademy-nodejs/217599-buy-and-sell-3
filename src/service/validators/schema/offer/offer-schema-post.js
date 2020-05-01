'use strict';

const {parseTXTFile, compareArrayToAnotherArray, checkDuplicateInArray, checkStrBySpace} = require(`../../../utils`);
const {FILE_PATH, OfferType, COUNT} = require(`../../../constants`);

const offerSchemaPost = {
  type: {
    exists: {
      errorMessage: `Вы не передали поле type`
    },
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
    }
  },
  category: {
    exists: {
      errorMessage: `Вы не передали поле category`
    },
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
    }
  },
  picture: {
    exists: {
      errorMessage: `Вы не передали поле picture`
    },
    isEmpty: {
      errorMessage: `Укажите картинку`,
      negated: true,
      options: {
        ignore_whitespace: true // eslint-disable-line camelcase
      }
    },
    escape: true
  },
  description: {
    exists: {
      errorMessage: `Вы не передали поле description`
    },
    isLength: {
      errorMessage:
        `Текст объявления. Минимум ${COUNT.DESCRIPTION.LENGTH.MIN} символов, максимум ${COUNT.DESCRIPTION.LENGTH.MAX}`,
      options: {
        min: COUNT.DESCRIPTION.LENGTH.MIN,
        max: COUNT.DESCRIPTION.LENGTH.MAX
      }
    },
    escape: true
  },
  title: {
    exists: {
      errorMessage: `Вы не передали поле title`
    },
    isLength: {
      errorMessage:
        `Заголовок объявления. Минимум ${COUNT.TITLE.LENGTH.MIN} символов, максимум ${COUNT.TITLE.LENGTH.MAX}`,
      options: {
        min: COUNT.TITLE.LENGTH.MIN,
        max: COUNT.TITLE.LENGTH.MAX
      }
    },
    escape: true
  },
  sum: {
    exists: {
      errorMessage: `Вы не передали поле sum`
    },
    isInt: {
      errorMessage: `Сумма должна быть c минимальным числом ${COUNT.COST.MIN}`,
      options: {
        min: COUNT.COST.MIN
      }
    },
    toInt: true
  }
};

module.exports = offerSchemaPost;
