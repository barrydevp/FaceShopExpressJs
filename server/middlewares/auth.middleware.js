//var db = require('../db.js');

module.exports.requireAuth = (req, res, next) => {
	const preUrl = req.signedCookies.preUrl || '/user';
	if(!res.locals.user) {
		if (req.baseUrl !== '/login' && req.baseUrl !== '/register') {
			res.redirect('/login');
			return;
		}
	} else {
		if (req.baseUrl === '/login' || req.baseUrl === '/register') {
			res.redirect(preUrl);
			return;
		}
	}

	next();
}

/* module.exports.requireAuth = (req, res, next) => {
	var userId = req.signedCookies.userId;
	if(!userId) {
		res.redirect('/login');
		return;
	}

	var matchedUser = db.get('users').find({ id: userId }).value();

	if(!matchedUser) {
		res.redirect('/login');
		return;
	}

	res.locals.user = matchedUser;
	//console.log(res.locals.user);
	next();
}

module.exports.loginAuth = (req, res, next) => {
	var preUrl = req.signedCookies.preUrl || '/user';
	var userId = req.signedCookies.userId;
	var matchedUser = db.get('users').find({ id: userId }).value();
	if (matchedUser) {
		res.redirect(preUrl);
		return;
	}

	next();
}

module.exports.notRequireAuth = (req, res, next) => { 
	var userId = req.signedCookies.userId;
	if (userId) {
		var matchedUser = db.get('users').find({ id: userId }).value();
	}

	if (matchedUser) {
		res.locals.user = matchedUser;
	}
	
	//console.log(res.locals.user);
	next();
} */