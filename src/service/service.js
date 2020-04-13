'use strict';

const {Cli} = require(`./cli`);
const {USER_ARGV_INDEX, DEFAULT_COMMAND, ExitCode} = require(`./constants`);


const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;
const [userCount] = userArguments.slice(1);

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userCount);
