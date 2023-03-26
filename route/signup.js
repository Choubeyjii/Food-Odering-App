const express = require('express')

const UserController = require('../controller/signup')

const router = express.Router();

router.post('',UserController.signup)


module.exports = router;