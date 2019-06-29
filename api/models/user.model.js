const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  friends: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    default: [],
  }
})

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: { 
    type: String,
    default: 'No name'
  },
  birthday: {
    type: Date,
    default: Date.now()
  },
  gender: {
    type: String,
    default: 'Male'
  },
  email: {
    type: String,
    required: true,
    default: 'example@example.com'
  }, 
  password: { 
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://scontent.fhan3-1.fna.fbcdn.net/v/t31.0-1/c282.0.960.960a/p960x960/10506738_10150004552801856_220367501106153455_o.jpg?_nc_cat=1&_nc_oc=AQnc_kCe1OrKZknlpP3d1dU5CFZaYO9DXlp8Mjx358EexdOJNkKWBJt4vOtik4-Ut-E&_nc_ht=scontent.fhan3-1.fna&oh=4a56f6ccb67a48b68480a3231eb4891a&oe=5DB7C369'
  },
  friends: {
    type: [{
      type: Schema.Types.ObjectId, 
      ref: 'User'
    }],
    default: [],
  }, // contain id of friend
  notice: {
    type: [String],
    default: [],
  },
  request: {
    type: requestSchema,
    default: {
      friends: []
    }
  }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;