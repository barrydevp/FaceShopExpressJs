//import module
var express = require('express');
var controller = require('../controllers/user.controller.js');

//variable
var router = express.Router();

// //route get data
router.get('/', controller.get);
router.get('/get/friends', controller.getListFriend);

// //route post data
router.post('/:userId', controller.getById);

//route update data
router.put('/addfr/:friendId', controller.addFriend);
router.put('/:userId', controller.put);

//route delete data
router.delete('/delete/:userId', controller.deleteById);
router.delete('/deletefriend/:friendId', controller.deleteFriend);

module.exports = router;