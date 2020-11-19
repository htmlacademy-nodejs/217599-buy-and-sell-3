'use strict';

const packageJSONFile = require('../../../package.json');
const chalk = require('chalk');

module.exports = {
  name: '--version',
  run() {
    const version = packageJSONFile.version;

    console.info(chalk.blue(version));
  },
};
