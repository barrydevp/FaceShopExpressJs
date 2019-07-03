//var db = require('../db.js');
const Datauri = require('datauri');
const dUri = new Datauri();
const cloudinary = require('cloudinary');
const path = require('path');

/**

* @description This function converts the buffer to data url

* @param {Object} req containing the field object

* @returns {String} The data url from the string buffer

*/

let dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

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

	try {
		let avatar;
		if (req.file) {
			const file = dataUri(req).content;
			let result = await cloudinary.uploader.upload(file);
			//console.log(result);
			avatar = result.url || 'https://scontent.fhan3-1.fna.fbcdn.net/v/t31.0-1/c282.0.960.960a/p960x960/10506738_10150004552801856_220367501106153455_o.jpg?_nc_cat=1&_nc_oc=AQnc_kCe1OrKZknlpP3d1dU5CFZaYO9DXlp8Mjx358EexdOJNkKWBJt4vOtik4-Ut-E&_nc_ht=scontent.fhan3-1.fna&oh=4a56f6ccb67a48b68480a3231eb4891a&oe=5DB7C369';
		}
		req.body.avatar = avatar;
		await userModel.create(req.body);
		res.redirect('/login');
	} catch(err) {
		console.error(err);
		res.send('Error while access database');
	}
	
};

module.exports.newPostCreate = async (req, res) => {

	try {
		let avatar;
		//console.log(req.file);
		if (req.file) {
			const file = dataUri(req).content;
			let result = await cloudinary.uploader.upload(file);
			console.log(result);
			avatar = result.url || 'https://scontent.fhan3-1.fna.fbcdn.net/v/t31.0-1/c282.0.960.960a/p960x960/10506738_10150004552801856_220367501106153455_o.jpg?_nc_cat=1&_nc_oc=AQnc_kCe1OrKZknlpP3d1dU5CFZaYO9DXlp8Mjx358EexdOJNkKWBJt4vOtik4-Ut-E&_nc_ht=scontent.fhan3-1.fna&oh=4a56f6ccb67a48b68480a3231eb4891a&oe=5DB7C369';

		}
		//await userModel.create(req.body);
		//console.log(req.body);
		//console.log(avatar);
		res.redirect('/login');
	} catch(err) {
		console.error(err);
		res.send('Error while access database');
	}
	
};

module.exports.newCreate = (req, res) => {
	res.render('register/newcreate', {
		quantity: res.locals.quantity,
	});
};