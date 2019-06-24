//var db = require('../db.js');
//var friendModel = require('../../api/models/friend.model');
const userModel = require('../../api/models/user.model');

module.exports.index = async (req, res) => {
  const quantity = req.signedCookies.quantity;
  const userId = req.signedCookies.userId;
  var friends = [];
  var maxpage = 0;
  var page = 0;
  var firstpage = 1;
  let countmax = 0;

  try {
    let userDoc = await userModel.findOne({ _id: userId }).populate('friends');
    if(userDoc) {
      friends = userDoc.toObject().friends;
    }
    maxpage = Math.ceil(friends.length / 5);
    page = parseInt(req.query.page) || 1;
    perpage = 5;
    countmax = Math.floor(maxpage / 5) ? 5 : maxpage;

    if (page < 1) {
      page = 1;
    } else if (page > maxpage) {
      page = maxpage;
    }

    if (page + 2 > maxpage) {
      firstpage = maxpage - countmax + 1;
    } else {
      firstpage = (page - Math.floor(countmax / 2) > 0) ? (page - Math.floor(countmax / 2)) : 1;
    }

    var start = (page - 1) * perpage;
    friends = friends.slice(start, start + perpage);
  } catch (err) {
    console.error(err);
  }

  res.render('friends/friend', {
    userLogin: res.locals.user,
    quantity: res.locals.quantity,
    friends: friends,
    pagination: {
      page: page,
      perpage: perpage,
      firstpage: firstpage,
      maxpage: maxpage,
      countmax: countmax
    }
  });
};

// module.exports.search = (req, res) => {
//   //console.log(req.query);
//   var users = db.get('users').value();
//   var username = req.query.username.toUpperCase();
//   var matchedUsers = users.filter(user => user.username.toUpperCase().indexOf(username) !== -1);
//   res.render('user/user', {
//     userLogin: res.locals.user,
//     users: matchedUsers
//   })
// };

// module.exports.view = (req, res) => {
//   var id = req.params.id;
//   var user = db.get('users').find({ id: id }).value();
//   res.render('user/view', {
//     user: user
//   })
// };