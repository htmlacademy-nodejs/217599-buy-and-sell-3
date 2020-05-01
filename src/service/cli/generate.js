'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle, parseTXTFile, runParallel} = require(`../utils`);
const {ExitCode, FILE_PATH, OfferType, ID_SIZE, COUNT} = require(`../constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const getPictureFileName = (imageNumber) => {
  return `item${imageNumber < 10 ? `0${imageNumber}` : imageNumber}.jpg`;
};

const generateOffers = (count, titles, descriptions, categories, usersComments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(ID_SIZE),
    category: shuffle(categories).slice(COUNT.CATEGORY.MIN - 1, getRandomInt(COUNT.CATEGORY.MIN, COUNT.CATEGORY.MAX)),
    description: shuffle(descriptions).slice(COUNT.DESCRIPTION.MIN, COUNT.DESCRIPTION.MAX).join(` `),
    picture: getPictureFileName(getRandomInt(COUNT.PICTURE.MIN, COUNT.PICTURE.MAX)),
    title: titles[getRandomInt(COUNT.TITLE.MIN - 1, COUNT.TITLE.MAX - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(COUNT.COST.MIN, COUNT.COST.MAX),
    comments: shuffle(usersComments).map(() => ({
      id: nanoid(ID_SIZE),
      text: shuffle(usersComments).slice(1, 3).join(` `)
    })).slice(COUNT.COMMENT.MIN - 1, getRandomInt(COUNT.COMMENT.MIN - 1, COUNT.COMMENT.MAX))
  }))
);

module.exports = {
  name: `--generate`,
  async run(count) {
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > COUNT.ADVERT.MAX) {
      console.log(chalk.red(`Не больше ${COUNT.ADVERT.MAX} объявлений`));

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
