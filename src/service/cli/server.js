'use strict';

const express = require('express');
const {DefaultPorts, ExitCodes} = require('../../constants');
const {HTTPCodes, HTTPMessages} = require('../../constants');
const {getLogger} = require('../lib');

const app = express();
const apiRoutes = require('../api');
const logger = getLogger({name: 'api'});

app.set('json spaces', 2);

app.use(express.json());
app.use('/api', apiRoutes);

app.use('/favicon.ico', (req, res) => {
  res.status(HTTPCodes.NoContent).send(HTTPMessages[HTTPCodes.NoContent]);
});

app.use((req, res) => {
  logger.error(`Route not found: ${req.url}`);

  res.status(HTTPCodes.NotFound).send(HTTPMessages[HTTPCodes.NotFound]);
});

app.use((err, req, res, _next) => {
  res
    .status(HTTPCodes.InternalServerError)
    .send(HTTPMessages[HTTPCodes.InternalServerError]);

  logger.error(`An error occured on processing request: ${err.message}`);
});

module.exports = {
  name: '--server',
  run(customPort) {
    const port = parseInt(customPort, 10) || DefaultPorts.API;

    app.listen(port, (err) => {
      if (err) {
        logger.error(`Ошибка при создании сервера: ${err}`);
        return process.exit(ExitCodes.error);
      }

      return logger.info(
        `Ожидаю соединений на ${port}: http://localhost:${port}`,
      );
    });
  },
};
