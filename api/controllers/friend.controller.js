const friendModel = require('../models/friend.model');

module.exports.get = async (req, res, next) => {
  let data = [];

  try {
    data = await friendModel.find().sort('_id');
  } catch (err) {
    console.error(err);
  }

  res.json(data);
}

module.exports.getById = async (req, res, next) => {
  let data;
  const friendId = req.params.friendId;

  try {
    data = await friendModel.findOne({ _id: friendId });
  } catch (err) {
    console.error(err);
  }

  res.json(data);

}

module.exports.post = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  let message = "";

  try {
    await friendModel.create(data);
    message = 'post success!';
  } catch (err) {
    console.error(err);
    message = 'post error';
  }

  res.send(message);
}

module.exports.put = async (req, res, next) => {
  const data = req.body;
  const friendId = req.params.friendId;

  try {
    await friendModel.updateOne({ _id: friendId }, data);
  } catch (err) {
    console.error(err);
  }

  res.send(200);
}

module.exports.deleteById = async (req, res, next) => {
  const friendId = req.params.friendId;

  try {
    await friendModel.deleteOne({ _id: friendId });
    res.send(200);
  } catch (err) {
    console.error(err);
    res.send(400);
  }
}