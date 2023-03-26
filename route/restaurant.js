const express = require('express');
const route = express.Router();
const controllerRestaurant = require('../controller/restaurant');



// For the searched restaurnt by the Locations
route.get('/',controllerRestaurant.getAllRestaurantName);

// For the searched restaurnt by the city name
route.get('/:cName',controllerRestaurant.getAllRestaurantNameByCityName);

// For the searched restaurnt by the restaurant name with city id
route.get('/details/:name',controllerRestaurant.getRestaurantDetails)

// for the cuisine methods
route.post('/filter/:pageNo',controllerRestaurant.getAllRestaurantsByFilter)


module.exports = route;