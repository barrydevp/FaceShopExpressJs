//import module
var express = require('express');
var controller = require('../controllers/login.controller.js')

//variable
var router = express.Router();

//route get
router.get('/', controller.index);
router.post('/', controller.login);

module.exports = router;