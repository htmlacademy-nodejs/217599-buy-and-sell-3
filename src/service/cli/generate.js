'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {
  getRandomInt,
  shuffle,
  parseTXTFile,
  runParallel,
} = require(`../../utils`);
const {
  ExitCode,
  FilePaths,
  OfferType,
  MocksOptions,
} = require(`../../constants`);

const DEFAULT_COUNT = 1;

const getPictureFileName = (imageNumber, fileName) => {
  return `${fileName}${imageNumber < 10 ? `0${imageNumber}` : imageNumber}.jpg`;
};

const generateOffers = (
  count,
  titles,
  descriptions,
  categories,
  usersComments,
) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MocksOptions.Range.IdSize.Max),
      categories: shuffle(categories).slice(
        MocksOptions.Range.Category.Min - 1,
        getRandomInt(
          MocksOptions.Range.Category.Min,
          MocksOptions.Range.Category.Max,
        ),
      ),
      description: shuffle(descriptions)
        .slice(
          MocksOptions.Range.Description.Min,
          MocksOptions.Range.Description.Max,
        )
        .join(` `),
      picture: getPictureFileName(
        getRandomInt(
          MocksOptions.Range.Picture.Min,
          MocksOptions.Range.Picture.Max,
        ),
        `item`,
      ),
      title:
        titles[
          getRandomInt(
            MocksOptions.Range.Title.Min - 1,
            MocksOptions.Range.Title.Max - 1,
          )
        ],
      type: Object.keys(OfferType)[
        Math.floor(Math.random() * Object.keys(OfferType).length)
      ],
      sum: getRandomInt(
        MocksOptions.Range.Cost.Min,
        MocksOptions.Range.Cost.Max,
      ),
      comments: shuffle(usersComments)
        .map(() => ({
          id: nanoid(MocksOptions.Range.IdSize.Max),
          text: shuffle(usersComments).slice(1, 3).join(` `),
        }))
        .slice(
          MocksOptions.Range.Comment.Min - 1,
          getRandomInt(
            MocksOptions.Range.Comment.Min - 1,
            MocksOptions.Range.Comment.Max,
          ),
        ),
    }));

module.exports = {
  name: `--generate`,
  async run(count) {
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MocksOptions.Range.Advert.Max) {
      console.log(
        chalk.red(`Не больше ${MocksOptions.Range.Advert.Max} объявлений`),
      );

      process.exit(ExitCode.error);
    }

    try {
      const content = await runParallel(
        parseTXTFile(FilePaths.Titles),
        parseTXTFile(FilePaths.Descriptions),
        parseTXTFile(FilePaths.Categories),
        parseTXTFile(FilePaths.Comments),
      ).then(([titles, descriptions, categories, comments]) =>
        JSON.stringify(
          generateOffers(
            countOffer,
            titles,
            descriptions,
            categories,
            comments,
          ),
          null,
          ` `,
        ),
      );

      await fs.writeFile(MocksOptions.FileName, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Mock file generation failed`));
      console.log(chalk.red(err));
      process.exit(ExitCode.error);
    }
  },
};
