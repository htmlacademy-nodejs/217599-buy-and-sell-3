'use strict';

const {getRandomInt, shuffle} = require(`../utils`);
const {ExitCode} = require(`../constants`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MaxCount = {
  advert: 1000,
  category: 6
};
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
    return (await fs.readFile(filePath, `utf8`)).trim().split(`\n`);
  } catch (err) {
    console.log(chalk.red(err));

    return [];
  }
};

const generateOffers = (count, titles, descriptions, categories) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(categories).slice(0, getRandomInt(1, MaxCount.category)),
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

    if (countOffer > MaxCount.advert) {
      console.log(chalk.red(`Не больше ${MaxCount.advert} объявлений`));

      process.exit(ExitCode.error);
    }

    const titles = await readContent(FILE_TITLES_PATH);
    const descriptions = await readContent(FILE_DESCRIPTIONS_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const content = JSON
      .stringify(generateOffers(countOffer, titles, descriptions, categories), null, ` `);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};
