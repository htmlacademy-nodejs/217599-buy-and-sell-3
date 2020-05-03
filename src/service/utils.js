'use strict';

const fs = require(`fs`).promises;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  const someArrayCopied = [...someArray];

  for (let i = someArrayCopied.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArrayCopied[i], someArrayCopied[randomPosition]] = [someArrayCopied[randomPosition], someArrayCopied[i]];
  }

  return someArrayCopied;
};

const readFile = async (filePath) => {
  try {
    return await fs.readFile(filePath, `utf8`);
  } catch (err) {
    throw err;
  }
};

const parseJSONFile = async (filePath) => {
  try {
    const fileContent = await readFile(filePath);

    return JSON.parse(fileContent);
  } catch (err) {
    throw err;
  }
};

const parseTXTFile = async (filePath) => {
  try {
    const content = await readFile(filePath);

    if (!content.trim().length) {
      throw new Error(`Файл пуст`);
    }

    return content.trim().split(`\n`);
  } catch (err) {
    throw err;
  }
};

const runParallel = async (...cb) => Promise.all([...cb]);

const checkDuplicateInArray = (arr) => arr.some((item, idx) => arr.indexOf(item) !== idx);

const compareArrayToAnotherArray = (arr, masterArr) => arr.filter((item) => masterArr.indexOf(item) === -1);

const checkStrBySpace = (str) => str.search(` `) !== -1;

const uniqueObjArr = (arr, key) => {
  let tmpArray = [];

  return [...arr].filter((item) => {
    if (tmpArray.indexOf(item[key]) === -1) {
      tmpArray.push(item[key]);

      return true;
    }

    return false;
  });
};

module.exports = {
  getRandomInt,
  shuffle,
  parseJSONFile,
  parseTXTFile,
  runParallel,
  checkDuplicateInArray,
  compareArrayToAnotherArray,
  checkStrBySpace,
  uniqueObjArr
};
