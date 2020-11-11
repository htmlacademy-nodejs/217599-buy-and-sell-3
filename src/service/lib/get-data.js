'use strict';

const {parseJSONFile} = require('../../utils');
const {MocksOptions} = require('../../constants');

let data;

const getMockData = async () => {
  if (data) {
    return Promise.resolve(data);
  }

  try {
    data = await parseJSONFile(MocksOptions.FileName);
  } catch (err) {
    console.log(err);

    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
