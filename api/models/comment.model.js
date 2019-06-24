const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  body: {
    type: String,
    default: 'None!'
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Comment = mongoose.model('Comment', commentSchema, 'comments');

module.exports = Comment;