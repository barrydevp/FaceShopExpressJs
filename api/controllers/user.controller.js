const userModel = require('../models/user.model');
const sessionModel = require('../models/session.model');

//get method
module.exports.get = async (req, res, next) => {
  let data = [];

  try {
    data = await userModel.find().sort('_id');
  } catch (err) {
    console.error(err);
  }

  res.json(data);
}

module.exports.getById = async (req, res, next) => {
  let data;
  const userId = req.params.userId;

  try {
    data = await userModel.findOne({ _id: userId }).populate('friends', 'fullname email avatar');
  } catch (err) {
    console.error(err);
  }

  res.json(data);

}

module.exports.getListFriend = async (req, res, next) => {
  const userId = req.signedCookies.userId;

  try {
    const userDoc = await userModel.findOne({ _id : userId }).populate('friends');
    const friends = userDoc.toObject().friends;
    //console.log(friends);

    res.send(friends);
  } catch(err) {
    console.error(err);
    res.send(404);
  }
}

//post method
module.exports.post = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  let message = "";

  try {
    await userModel.create(data);
    message = 'post success!';
  } catch (err) {
    console.error(err);
    message = 'post error';
  }

  res.send(message);
}

//put method
module.exports.put = async (req, res, next) => {
  const data = req.body;
  const userId = req.params.userId;

  try {
    await userModel.updateOne({ _id: userId }, req.body);
  } catch (err) {
    console.error(err);
  } 

  res.send(200);
}

module.exports.addFriend = async (req, res, next) => {
  const userId = req.signedCookies.userId;
  const friendId = req.params.friendId;

  try {
    if(friendId && userId) {
      const userDoc = userModel.findByIdAndUpdate(userId,
        { $push: { friends: friendId } },
        { safe: true, upsert: true },
      );
    }
    //res.json(friends);
    res.send(200);
  } catch (err) {
    console.error(err);
    res.send(404);
  }

}

//delete method
module.exports.deleteById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    await userModel.deleteOne({ _id: userId });
    res.send(200);
  } catch (err) {
    console.error(err);
    res.send(400);
  }
}

module.exports.deleteFriend = async (req, res, next) => {
  const friendId = req.params.friendId;
  const userId = req.signedCookies.userId;

  try {
    if(friendId && userId) {
    const userDoc = await userModel.findByIdAndUpdate(userId,
      { $pull: { friends: friendId } },
      { safe: true, upsert: true }
    ).populate('friends');
    
      let friends = userDoc.toObject().friends;
      /* console.log(friends); */
      /* res.json(friends); */
      
    } 
    res.send(200);

  } catch(err) {
    console.error(err);
    res.send(404);
  }


}