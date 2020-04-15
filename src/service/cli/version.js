'use strict';

const packageJSONFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageJSONFile.version;

    console.log(version);
  }
};
