'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const {HTTP_CODE} = require(`../constants`);

const app = express();

const DEFAULT_PORT = 3000;
const {NOT_FOUND_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE} = require(`../constants`);
const {offersRoutes, searchRoutes, categoriesRoutes} = require(`../routes/index`);

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

module.exports = {
  name: `--server`,
  run(customPort) {
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, () => {
      return console.log(chalk.green(`Ожидаю соединений на ${port}: http://localhost:${port}`));
    }).on(`error`, (err) => {
      return console.error(chalk.red(`Ошибка при создании сервера ${err}`));
    });
  }
};
