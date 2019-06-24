var userModel = require('../../api/models/user.model');

module.exports.getUserLogin = async (req, res, next) => {
  try {
    const userId = req.signedCookies.userId;
    if(userId) {
      const matchedUser = await userModel.findOne({ _id: userId });
      if(matchedUser) {
        res.locals.user = matchedUser;
      }
    }
  } catch(err) {
    console.err(err);
  }

  next();
}