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

	var username = req.query.username.toUpperCase();
	var matchedUsers = users.filter(user => user.username.toUpperCase().indexOf(username) !== -1);
	res.render('user/user', {
		userLogin: res.locals.user,
		quantity: res.locals.quantity,
		users: matchedUsers
	});
};

module.exports.view = async (req, res) => {
	var id = req.params.id;

	var user;
	try {
		user = await userModel.findOne({_id: id});
	} catch (err) {
		console.error(err);
	}

	res.render('user/view', {
		userLogin: res.locals.user,
		user: user,
		quantity: res.locals.quantity,
	});
};