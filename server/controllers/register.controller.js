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
	if(req.body.fullname === ' ' || !req.body.fullname) {
		req.body.fullname = 'No Name';
	}
	if(req.body.birthday) {
		req.body.birthday = new Date(req.body.birthday);
	}
	if (!req.body.avatar) {
		req.body.avatar = 'https://scontent.fhan3-1.fna.fbcdn.net/v/t31.0-1/c282.0.960.960a/p960x960/10506738_10150004552801856_220367501106153455_o.jpg?_nc_cat=1&_nc_oc=AQnc_kCe1OrKZknlpP3d1dU5CFZaYO9DXlp8Mjx358EexdOJNkKWBJt4vOtik4-Ut-E&_nc_ht=scontent.fhan3-1.fna&oh=4a56f6ccb67a48b68480a3231eb4891a&oe=5DB7C369'
	}
	//req.body.avatar = '/' + req.file.path.split('/').slice(1).join('/');
	try {
		await userModel.create(req.body);
		res.redirect('/login');
	} catch(err) {
		console.error(err);
		res.send('Error while access database');
	}
	
};