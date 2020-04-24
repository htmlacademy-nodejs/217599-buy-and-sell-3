'use strict';

const path = require(`path`);
const express = require(`express`);
const chalk = require(`chalk`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);

app.use((req, res) => {
  res.status(404).render(`errors/404`);
});
app.use((err, req, res, next) => {
  res.status(500).render(`errors/500`);
  console.error(err);
  next();
});

app.listen(DEFAULT_PORT, () => {
  console.log(chalk.green(`Сервер запушен на порту:${DEFAULT_PORT} http://localhost:${DEFAULT_PORT}`));
});
