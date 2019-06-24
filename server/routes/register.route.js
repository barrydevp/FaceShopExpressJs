//import module
const express = require('express');
const multer = require('multer');

const controller = require('../controllers/register.controller.js');
const validate = require('../validate/user.validate.js')

//variable
const router = express.Router();
var upload = multer({ dest: './public/uploads/' })

//route get
router.get('/', controller.create);
//router.post('/', upload.single('avatar'), validate.postCreate, controller.postCreate);
router.post('/', validate.postCreate, controller.postCreate);

module.exports = router;