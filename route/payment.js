const express = require('express');
const paymentController = require('../controller/payment')


const route = express.Router();


// for the Payment
route.post('',paymentController.createOrder);
route.post('/save',paymentController.saveTransaction);

module.exports = route;
