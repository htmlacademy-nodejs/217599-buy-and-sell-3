'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle, parseTXTFile, runParallel} = require(`../utils`);
const {ExitCode, FILE_PATH, OfferType, ID_SIZE} = require(`../constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_COUNT = Object.freeze({
  ADVERT: 1000,
  CATEGORY: 6,
  COMMENTS: 9
});
const Cost = {
  min: 1000,
  max: 100000
};
const PictureCount = {
  min: 1,
  max: 16
};

const getPictureFileName = (imageNumber) => {
  return `item${imageNumber < 10 ? `0${imageNumber}` : imageNumber}.jpg`;
};

const generateOffers = (count, titles, descriptions, categories, usersComments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(ID_SIZE),
    category: shuffle(categories).slice(0, getRandomInt(1, MAX_COUNT.CATEGORY)),
    description: shuffle(descriptions).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureCount.min, PictureCount.max)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(Cost.min, Cost.max),
    comments: shuffle(usersComments).map(() => ({
      id: nanoid(ID_SIZE),
      text: shuffle(usersComments).slice(1, 3).join(` `)
    })).slice(0, getRandomInt(0, MAX_COUNT.COMMENTS))
  }))
);

module.exports = {
  name: `--generate`,
  async run(count) {
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT.ADVERT) {
      console.log(chalk.red(`Не больше ${MAX_COUNT.ADVERT} объявлений`));

      process.exit(ExitCode.error);
    }

    try {
      const content = await runParallel(
          parseTXTFile(FILE_PATH.TITLES),
          parseTXTFile(FILE_PATH.DESCRIPTIONS),
          parseTXTFile(FILE_PATH.CATEGORIES),
          parseTXTFile(FILE_PATH.COMMENTS)
      ).then(([titles, descriptions, categories, comments]) => JSON
        .stringify(generateOffers(countOffer, titles, descriptions, categories, comments), null, ` `)
      );

      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Mock file generation failed`));
      console.log(chalk.red(err));
      process.exit(ExitCode.error);
    }
  }
};
