const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: String,
  email: {
    type: String,
    required: true,
  }, 
  password: { 
    type: String,
    required: true,
  },
  avatar: String,
  friends: {
    type: [{
      type: Schema.Types.ObjectId, 
      ref: 'User'
    }],
    default: [],
  }, // contain id of friend
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;