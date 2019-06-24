//var db = require('../db.js');
var userModel = require('../../api/models/user.model.js')
var shortid = require('shortid');
var md5 = require('md5');

module.exports.create = (req, res) => {
	res.render('register/getCreate', {
		quantity: res.locals.quantity,
	});
};

module.exports.postCreate = async (req, res) => {
	//req.body.id = shortid.generate();
	req.body.password = md5(req.body.password);
	//req.body.avatar = '/' + req.file.path.split('/').slice(1).join('/');
	try {
		await userModel.create(req.body);
		res.redirect('/login');
	} catch(err) {
		console.err(err);
		res.send('Error while access database');
	}
	
};