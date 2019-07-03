//import module
// import { uploader, cloudinaryConfig } from '../config/clourdinary.config';
// import { getMulterUploadsSingle, dataUri } from '../middlewares/multer.middleware';

const express = require('express');
//const multer = require('multer');
const multerMiddleware = require('../middlewares/multer.middleware');
const cloudinaryConfig = require('../config/cloudinary.config');

const controller = require('../controllers/register.controller.js');
const validate = require('../validate/user.validate.js')

//variable
const router = express.Router();
//let upload = multer({ dest: './public/uploads/' });
// let storage = multer.memoryStorage();
// let upload = multer({ storage: storage });

router.use('*', cloudinaryConfig.cloudinaryConfig);

//route get
router.get('/', controller.create);
router.get('/new', controller.newCreate);
//router.post('/', upload.single('avatar'), validate.postCreate, controller.postCreate);
router.post('/', multerMiddleware.getMulterUploadsSingle('avatar'), validate.postCreate, controller.postCreate);
router.post('/new', multerMiddleware.getMulterUploadsSingle('avatar'), controller.newPostCreate)

module.exports = router;