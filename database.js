require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.set('useFindAndModify', false);

module.exports = mongoose;