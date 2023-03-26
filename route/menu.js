const express = require('express');
const menuController = require('../controller/menu')

const route = express.Router();


// for the Menu
route.get('/:rName',menuController.getMenuByRestaurant);

module.exports = route;
