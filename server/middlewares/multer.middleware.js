// import multer from 'multer';

// import Datauri from 'datauri';

// import path from 'path';
const multer = require('multer');

const storage = multer.memoryStorage();

module.exports.getMulterUploadsSingle = (fieldname) => multer({ storage }).single(fieldname);

//export { getMulterUploadsSingle, dataUri };