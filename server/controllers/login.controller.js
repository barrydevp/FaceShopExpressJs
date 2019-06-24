//var db = require('../db.js');
var userModel = require('../../api/models/user.model');
var md5 = require('md5');

module.exports.index = (req, res, next) => {
	res.render('login/index');
}

module.exports.login = async (req, res, next) => {
	var preUrl = req.signedCookies.preUrl || '/user';
	var username = req.body.username;
	var password = req.body.password;

	try {
		var user = await userModel.findOne({username: username});
		if (!user) {
			res.render('login/index', {
				locals: res.locals,
				errors: 'User does not exits.',
			});

			return;
		}

		var hashedPassword = md5(password);
		if (user.password !== hashedPassword) {
			res.render('login/index', {
				quantity: res.locals.quantity,
				errors: 'Wrong password.',
				value: username
			});

			return;
		}

		res.cookie('userId', user._id, {
			signed: true
		});

	} catch(err) {
		console.error(err);
	}
	
	res.redirect(preUrl); 
}