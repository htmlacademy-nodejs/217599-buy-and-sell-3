'use strict';

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

module.exports = {
  getRandomInt,
  shuffle
};
