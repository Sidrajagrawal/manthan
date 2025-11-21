const express = require('express');
const route = express.Router();
const { UnchangeableHandler, RealHandler } = require('../controller/Outputhandler');

route.post('/unchangeable', UnchangeableHandler)
route.post('/real', RealHandler)

module.exports = route;
