'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const indexRoutes = require(`./routes/index-routes`);
const registerRoutes = require(`./routes/register-routes`);
const loginRoutes = require(`./routes/login-routes`);
const myRoutes = require(`./routes/my-routes`);
const offersRoutes = require(`./routes/offers-routes`);
const searchRoutes = require(`./routes/search`);

const DEFAULT_PORT = 8080;
const app = express();

app.use(`/`, indexRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/search`, searchRoutes);

app.listen(DEFAULT_PORT, () => {
  console.log(chalk.green(`Сервер запушен на порту:${DEFAULT_PORT} http://localhost:${DEFAULT_PORT}`));
});
