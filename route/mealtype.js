const express = require('express');
const mealtypeController = require('../controller/mealtype')

const route = express.Router();


// for the Mealtype
route.get('/',mealtypeController.getAllMealtype);

module.exports = route;
