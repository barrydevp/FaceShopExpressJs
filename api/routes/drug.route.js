//import module
const express = require('express');
const controller = require('../controllers/drug.controller.js')

//variable
var router = express.Router();

//route get data
router.get('/get', controller.getAll);
router.get('/get/:drugId', controller.getById);
router.get('/getlisttrend', controller.getListTrend)
//router.get('/carts/getList', controller.getListCart);

//route post data
router.post('/', controller.post);

//route put data
router.put('/:drugId', controller.put);

//route delete data
router.delete('/delete/:drugId', controller.deleteById);

module.exports = router;