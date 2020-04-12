'use strict';

const version = require(`./version`);
const help = require(`./help`);
const generate = require(`./generate`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate
};

module.exports = {
  Cli
};
