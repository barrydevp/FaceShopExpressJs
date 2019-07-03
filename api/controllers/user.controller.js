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
    const userDoc = await userModel.findOne({ _id : userId }).populate('friends', 'fullname avatar email birthday friends');
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
      await Promise.all([userModel.findByIdAndUpdate(userId,
        { $addToSet: { friends: friendId } },
        { safe: true },
      ), userModel.findByIdAndUpdate(friendId,
        { $addToSet: { friends: userId } },
        { safe: true },
      ),userModel.findByIdAndUpdate(userId,
        { $pull: { 'request.friends' : friendId } },
        { safe: true }
      )]);
      res.send(200);
    }
    //res.json(friends);
    else res.send(400);
  } catch (err) {
    console.error(err);
    res.send(404);
  }

}

module.exports.addReqFriend = async (req, res, next) => {
  const userId = req.signedCookies.userId;
  const friendId = req.params.friendId;

  try {
    if(friendId && userId) {
      const userDoc = await userModel.findByIdAndUpdate(friendId,
        { $addToSet: { 'request.friends': userId } },
        { safe: true },
      );
      //console.log(userDoc);
      res.send(200);
    } else res.send(400);
    //res.json(friends);
    
  } catch (err) {
    console.error(err);
    res.send(404);
  }

}

module.exports.deleteFriend = async (req, res, next) => {
  const friendId = req.params.friendId;
  const userId = req.signedCookies.userId;

  try {
    if (friendId && userId) {
      await Promise.all([userModel.findByIdAndUpdate(userId,
        { $pull: { friends: friendId } },
        { safe: true }
      ), userModel.findByIdAndUpdate(friendId,
        { $pull: { friends: userId } },
        { safe: true }
      )]);

      //let friends = userDoc.toObject().friends;
      /* console.log(friends); */
      /* res.json(friends); */
      res.send(200);
    }
    else res.send(400);

  } catch (err) {
    console.error(err);
    res.send(404);
  }


}

module.exports.delReqFriend = async (req, res, next) => {
  const friendId = req.params.friendId;
  const userId = req.signedCookies.userId;

  try {
    if (friendId && userId) {
      const userDoc = await userModel.findByIdAndUpdate(userId,
        { $pull: { 'request.friends': friendId } },
        { safe: true }
      );

      //let friends = userDoc.toObject().friends;
      /* console.log(friends); */
      /* res.json(friends); */
      res.send(200);
    }
    else res.send(400);

  } catch (err) {
    console.error(err);
    res.send(404);
  }


}

module.exports.delReqFriendAdvance = async (req, res, next) => {
  const userId = req.params.userId;
  const fromUserId = req.params.fromUserId;

  try {
    if (friendId && userId) {
      const userDoc = await userModel.findByIdAndUpdate(fromUserId,
        { $pull: { 'request.friends': userId } },
        { safe: true }
      );
      
      //let friends = userDoc.toObject().friends;
      /* console.log(friends); */
      /* res.json(friends); */
      res.send(200);
    }
    else res.send(400);

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

