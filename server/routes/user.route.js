//import module
var express = require('express');
var controller = require('../controllers/user.controller.js');

//variable
var router = express.Router();

//route get
router.get('/', controller.index);
router.get('/logout', controller.logout);
router.get('/search', controller.search);

//route post
router.get('/:id', controller.view);

module.exports = router;