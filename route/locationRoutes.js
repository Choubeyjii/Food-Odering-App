const express = require('express');
const controllerLocation = require('../controller/location')
const route = express.Router();


// for the location
route.get('/',controllerLocation.getAllRestaurantLocation);

module.exports = route;
