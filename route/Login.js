


const express = require('express')

const LoginController = require('../controller/Login')

const router = express.Router();

router.post('',LoginController.Login)


module.exports = router;