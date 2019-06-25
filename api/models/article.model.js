const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const voteSchema = new Schema({
//   like: {
//     type: Number,
//     default: 0
//   },
//   dislike: {
//     type: Number,
//     default: 0
//   }
// })

const articleSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: 'None!'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: [],
  }],
  date: {
    type: Date,
    default: Date.now()
  }
});

const Article = mongoose.model('Article', articleSchema, 'articles');

module.exports = Article;