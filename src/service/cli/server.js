'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const {HTTP_CODE, NOT_FOUND_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE, MOCKS_FILE_NAME} = require(`../constants`);
const {parseJSONFile, mockData} = require(`../utils`);
const {offersRoutes, searchRoutes, categoriesRoutes} = require(`../routes/index`);

const app = express();

const DEFAULT_PORT = 3000;

app.set(`json spaces`, 2);

app.use(express.json());

app.use(`/api/offers`, offersRoutes);
app.use(`/api/categories`, categoriesRoutes);
app.use(`/api/search`, searchRoutes);
app.use((req, res) => {
  res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_MESSAGE);
});
app.use((err, req, res, _next) => {
  res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MESSAGE);
  console.log(err);
});

// TODO [@Shirokuiu]: Временное решение
const createSessionMockData = async (fileName) => {
  try {
    mockData.offers = await parseJSONFile(fileName);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  name: `--server`,
  async run(customPort) {
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    // TODO [@Shirokuiu]: Временное решение
    try {
      await createSessionMockData(MOCKS_FILE_NAME);
    } catch (err) {
      mockData.offers = [];
    }

    app.listen(port, () => {
      console.log(chalk.green(`Ожидаю соединений на ${port}: http://localhost:${port}`));
    }).on(`error`, (err) => {
      console.error(chalk.red(`Ошибка при создании сервера ${err}`));
    });
  }
};
