//require
const express = require('express');
const controller = require('../controllers/session.controller');

//variable
const router = express.Router();

//route get data
router.get('/get', controller.getAll);
router.get('/get/:sessionId', controller.getById);
router.get('/getlistcart', controller.getListCart);

//route post data
router.post('/', controller.post);  //new sessionId

//route put data (update data)
router.put('/update/:sessionId', controller.put);
router.put('/addtocart/:productId/:count', controller.addToCart);  //add to cart

//route delete data
router.delete('/delete/:sessionId', controller.deleteById);
router.delete('/delete', controller.deleteAll)
router.delete('/deleteincart/:productId/:count', controller.deteleInCart);

module.exports = router;