//import module
var express = require('express');
var controller = require('../controllers/friend.controller.js')

//variable
var router = express.Router();

//route get data
router.get('/', controller.get);
router.get('/:friendId', controller.getById);

//route post data
router.post('/', controller.post);

//route put data
router.put('/:friendId', controller.put);

//route delete data
router.delete('/:friendId', controller.deleteById);

module.exports = router;