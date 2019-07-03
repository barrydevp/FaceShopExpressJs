//import module
const drugModel = require('../models/drug.model');
const sessionModel = require('../models/session.model');

//get method
module.exports.getAll = async (req, res, next) => {
  let data = [];
  
  try {
    data = await drugModel.find().sort('_id');
  } catch(err) {
    console.error(err);
  }

  res.json(data);
}

module.exports.getById = async (req, res, next) => {
  let data;
  const drugId = req.params.drugId;

  try {
    data = await drugModel.findOne({_id : drugId});
  } catch(err) {
    console.error(err);
  }

  res.json(data);

}

module.exports.getListTrend = async (req, res, next) => {
  //console.log('this');
  let data = [];
  try {
    let drugDocs = await drugModel.find().sort('-view');
    data = Array.from(drugDocs).slice(0, 12);
    //console.log(data);
  } catch(err) {
    console.error(err);
  }

  res.json(data);
}

// module.exports.getListCart = async (req, res, next) => {
//   let data = [];
//   const
//   try {
//     let data = await sessionModel.findOne({ _id: sessionId }).limit(12);

//   } catch(err) {
//     console.error(err);
//   }

//   res.json(Array.from(data));
// }

//post method
module.exports.post = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  let message = "";

  try {
    await drugModel.create(data);
    message = 'post success!';
  } catch(err) {
    console.error(err);
    message = 'post error';
  }

  res.send(message);
}

//put method
module.exports.put = async (req, res, next)  => {
  const data = req.body;
  const drugId = req.params.drugId;

  try {
    await drugModel.updateOne({_id : drugId}, req.body);
  } catch(err) {
    console.error(err);
  }

  res.send(200);
}

//delete method
module.exports.deleteById = async (req, res, next) => {
  const drugId = req.params.drugId;

  try {
    await drugModel.deleteOne({_id : drugId});
    res.send(200);
  } catch(err) {
    console.error(err);
    res.send(400);
  }
}