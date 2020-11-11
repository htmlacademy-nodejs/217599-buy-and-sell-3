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
    [someArrayCopied[i], someArrayCopied[randomPosition]] = [
      someArrayCopied[randomPosition],
      someArrayCopied[i],
    ];
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
    return [];
  }
};

const parseTXTFile = async (filePath) => {
  try {
    const content = await readFile(filePath);

    if (!content.trim().length) {
      return [];
    }

    return content.trim().split(`\n`);
  } catch (err) {
    return [];
  }
};

const runParallel = async (...cb) => Promise.all([...cb]);

const checkStrBySpace = (str) => str.search(` `) !== -1;

const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

const compareArrayToAnotherArray = (arr, masterArr) =>
  arr.filter((item) => masterArr.indexOf(item) === -1);

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

const uniquerArr = (arr) => [...new Set(arr)];

const sorting = (arr, key, isKeyHasLength = false) =>
  [...arr].sort((a, b) => {
    const first = isKeyHasLength ? a[key].length : a[key];
    const second = isKeyHasLength ? b[key].length : b[key];

    if (first < second) {
      return -1;
    }

    if (first > second) {
      return 1;
    }

    return arr;
  });

module.exports = {
  getRandomInt,
  shuffle,
  parseJSONFile,
  parseTXTFile,
  runParallel,
  checkStrBySpace,
  uniqueObjArr,
  uniquerArr,
  sorting,
  arrayEquals,
  compareArrayToAnotherArray,
};
