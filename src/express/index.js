'use strict';

const path = require(`path`);
const chalk = require('chalk');
const express = require('express');
const {DefaultPorts, HTTPCodes} = require('../constants');
const {
  mainRoutes,
  registerRoutes,
  loginRoutes,
  myRoutes,
  offersRoutes,
  searchRoutes,
} = require('./routes');

const app = express();
const PUBLIC_DIR = 'public';
const UPLOAD_DIR = 'upload';

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));
app.use('/', mainRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/my', myRoutes);
app.use('/offers', offersRoutes);
app.use('/search', searchRoutes);
app.use((req, res) => {
  res.status(HTTPCodes.NotFound).render('error/404');
});
app.use((err, req, res) => {
  res.status(HTTPCodes.InternalServerError).render('error/500');
  console.error(chalk.red(err));
});

app.listen(DefaultPorts.Client, (err) => {
  if (err) {
    console.error(chalk.red(`При создании сервера возникла ошибка`));
    console.error(err);

    return;
  }

  console.log(
    chalk.green(
      `Сервер успешно создан на порту ${DefaultPorts.Client} http://localhost:${DefaultPorts.Client}`,
    ),
  );
});
