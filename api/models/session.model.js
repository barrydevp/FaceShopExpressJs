const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const drugSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   image: {
//     type: String,
//     required: true
//   },
//   price: {
//     original: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     sale: {
//       type: Number,
//       default: 0,
//     }
//   },
//   // flavour: {
//   //   type: String,
//   //   default: 'Unflavoured' // khong mui` vi
//   // },
//   count: {
//     type: Number,
//     required: true,
//     default: 0,
//   }
// });

const cartSchema = new Schema({
  infor: {
    type: Schema.Types.ObjectId,
    ref: 'Drug',
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  }
}) 

const sessionSchema = new Schema({
  carts: [cartSchema]
});

let Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;