var userModel = require('../../api/models/user.model');

module.exports.getUserLogin = async (req, res, next) => {
  try {
    const userId = req.signedCookies.userId;
    if(userId) {
      const matchedUser = await userModel.findOne({ _id: userId }).populate('request.friends', 'fullname birthday avatar email friends').populate('friends', 'fullname birthday avatar email friends');
      //console.log(matchedUser.friends);
      if(matchedUser) {
        res.locals.user = matchedUser.toObject();
      }
    }
  } catch(err) {
    console.err(err);
  }

  next();
}                                