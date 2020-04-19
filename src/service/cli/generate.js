'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {getRandomInt, shuffle} = require(`../utils`);
const {ExitCode} = require(`../constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_COUNT = Object.freeze({
  ADVERT: 1000,
  CATEGORY: 6
});
const Cost = {
  min: 1000,
  max: 100000
};
const PictureCount = {
  min: 1,
  max: 16
};
const OfferType = {
  sale: `sale`,
  offer: `offer`
};
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_DESCRIPTIONS_PATH = `./data/descriptions.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const getPictureFileName = (imageNumber) => {
  return `item${imageNumber < 10 ? `0${imageNumber}` : imageNumber}.jpg`;
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);

    if (!content.length) {
      throw new Error(`Файл пуст`);
    }

    return content.trim().split(`\n`);
  } catch (err) {
    throw new Error(err);
  }
};

const runParallel = async (...cb) => Promise.all([...cb]);

const generateOffers = (count, titles, descriptions, categories) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(categories).slice(0, getRandomInt(1, MAX_COUNT.CATEGORY)),
    description: shuffle(descriptions).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureCount.min, PictureCount.max)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(Cost.min, Cost.max),
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
          readContent(FILE_TITLES_PATH),
          readContent(FILE_DESCRIPTIONS_PATH),
          readContent(FILE_CATEGORIES_PATH)
      ).then(([titles, descriptions, categories]) => JSON
        .stringify(generateOffers(countOffer, titles, descriptions, categories), null, ` `)
      );

      try {
        await fs.writeFile(FILE_NAME, content);
        console.info(chalk.green(`Operation success. File created.`));
      } catch (err) {
        console.error(chalk.red(`Can't write data to file...`));
        process.exit(ExitCode.error);
      }
    } catch (err) {
      console.log(chalk.red(err));
    }
  }
};
