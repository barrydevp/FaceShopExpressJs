//var db = require('../db.js');
var userModel = require('../../api/models/user.model');
var shortid = require('shortid');

module.exports.index = async (req, res) => {
	var users = [];
	try {
		users = await userModel.find();
	} catch(err) {
		console.error(err);
	}

	res.render('user/user', {
		userLogin: res.locals.user,
		quantity: res.locals.quantity,
		users: users
	});
};

module.exports.logout = (req, res) => {
	res.clearCookie('userId');
	res.redirect('/');
}

module.exports.search = async (req, res) => {
	var users = [];
	try {
		users = await userModel.find();
	} catch (err) {
		console.error(err);
	}

	var fullname = req.query.fullname.toUpperCase();
	var matchedUsers = users.filter(user => user.fullname.toUpperCase().indexOf(fullname) !== -1);
	res.render('user/user', {
		userLogin: res.locals.user,
		quantity: res.locals.quantity,
		users: matchedUsers
	});
};

module.exports.view = async (req, res, next) => {
	var id = req.params.id;
	let userLogin = res.locals.user;
	let isFriend = true;
	let isReqFr = true;
	let user;
	try {
		userDoc = await userModel.findOne({_id: id}).populate('friends');

		user = userDoc.toObject();
		//console.log(userLogin.friends);
		isFriend = Array.from(userLogin.friends).find((item) =>  {
			//console.log(user._id);
			//console.log(item._id);
			return String(item._id) === String(user._id);
		});

		isReqFr = Array.from(userLogin.request.friends).find((item) => {
			return String(item._id) === String(user._id);
		});
		isReqUser = Array.from(user.request.friends).find((item) => {
			return String(item._id) === String(userLogin._id);
		});
		res.render('user/view', {
			userLogin: userLogin,
			user: user,
			isFriend: isFriend,
			isReqFr: isReqFr,
			isReqUser: isReqUser,
			quantity: res.locals.quantity,
		});
	} catch (err) {
		console.error(err);
		next();
	}

	
	// res.render('user/view', {
	// 	userLogin: userLogin,
	// 	user: user,
	// 	isFriend: isFriend,
	// 	isReqFr: isReqFr,
	// 	isReqUser: isReqUser,
	// 	quantity: res.locals.quantity,
	// });
};