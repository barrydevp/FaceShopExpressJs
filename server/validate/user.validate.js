//var db = require('../db.js')
const userModel = require('../../api/models/user.model');

module.exports.postCreate = async (req, res, next) => {
	var errors = [];

	console.log(req.body);

	if(!req.body.username) {
		errors.push('Username is required!');
	} else {
		try {
			const user = await userModel.findOne({ username: req.body.username });
			if (user) errors.push('Username is exits!');
		}	catch(err) {
			console.error(err);
		}
		
	}

	if(!req.body.email) {
		errors.push('Email is required!');
	}

	if(!req.body.password) {
		errors.push('Password is required!');
	}

	if(errors.length) {
		res.render('register/postCreate', {
			errors: errors,
			value: req.body
		});

		return;
	}

	next();
}