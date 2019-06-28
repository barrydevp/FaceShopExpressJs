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

//route put data (create if not exists and update data)
router.put('/:userId', controller.put);

//route update data
router.patch('/addfr/:friendId', controller.addFriend);
router.patch('/addreq/friend/:friendId', controller.addReqFriend);
router.patch('/delfr/:friendId', controller.deleteFriend);
router.patch('/delreq/friend/:friendId', controller.delReqFriend);
router.patch('/delreq/friend/:userId/:fromUserId', controller.delReqFriendAdvance);

//route delete data
router.delete('/delete/:userId', controller.deleteById);


module.exports = router;