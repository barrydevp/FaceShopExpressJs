const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var friendSchema = new Schema({
  username: String,
  email: String,
  avatar: String
});

var Friend = mongoose.model('Friend', friendSchema, 'friends');

module.exports = Friend;