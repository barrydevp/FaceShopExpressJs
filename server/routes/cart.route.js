//import module
const express = require('express');
const controller = require('../controllers/cart.controller.js');

//variable
const router = express.Router();

//route get
router.get('/', controller.index);
router.get('/view/:productId', controller.view);
//router.get('/add/:productId/:count', controller.add);
router.get('/listcart', controller.listcart);
router.get('/create', controller.create);

//route post
router.post('/create', controller.post);

//route delete
//router.delete('/remove/:productId', controller.remove);

module.exports = router;