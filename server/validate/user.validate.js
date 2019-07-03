//var db = require('../db.js')
const userModel = require('../../api/models/user.model');

module.exports.postCreate = async (req, res, next) => {
	var errors = [];
	if(!req.body) {
		res.redirect('/register');
	}
	//console.log(req.body);
	if(!req.body.username) {
		errors.push('Username is required!');
	} else {
		let reg = /^[a-z0-9_-]{3,16}$/;
		if(reg.test(req.body.username)) {
			try {
				const user = await userModel.findOne({ username: req.body.username });
				if (user) errors.push('Username is exits!');
			} catch (err) {
				console.error(err);
			}
		} else {
			errors.push('Invalid username!')
		}
		
	}

	if(!req.body.email) {
		errors.push('Email is required!');
	}

	if(!req.body.password) {
		errors.push('Password is required!');
	}

	if(!req.body.fullname) {
		errors.push('Username is required!')
	}else {
		let reg = /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]{1,}(?: [A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+){0,2}$/;
		if (!reg.test(req.body.fullname)) errors.push('Invalid fullname!');
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