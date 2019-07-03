const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    default: 'No description!'
  },
  image: {
    type: String,
    required: true
  },
  price: {
    original: {
      type: Number,
      required: true,
      default: 0,
    },
    sale: {
      type: Number,
      default: 0,
    }
  },
  view: {
    type: Number,
    default: 0
  }
});

const Drug = mongoose.model('Drug', drugSchema, 'drugs');

module.exports = Drug;