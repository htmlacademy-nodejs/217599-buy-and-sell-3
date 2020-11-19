'use strict';

const axios = require('axios');
const {DefaultPorts} = require('../../constants');

const port = process.env.API_PORT || DefaultPorts.API;

const api = axios.create({
  baseURL: `http://localhost:${port}/api/`,
});

module.exports = api;
