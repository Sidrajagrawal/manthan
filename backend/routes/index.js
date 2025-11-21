const express = require('express');
const route = express.Router();
const OutputRoute = require('./Output');

route.use('/output', OutputRoute);

module.exports = route;