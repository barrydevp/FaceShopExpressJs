//require
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./database');

//transfer
const transferDb = require('./transferdb');

//require my module
const api = require('./api/api');
const userRoute = require('./server/routes/user.route');
const loginRoute = require('./server/routes/login.route');
const registerRoute = require('./server/routes/register.route');
const friendsRoute = require('./server/routes/friends.route');
const cartRoute = require('./server/routes/cart.route');
const userloginMiddleware = require('./server/middlewares/userlogin.middleware.js');
const authMiddleware = require('./server/middlewares/auth.middleware.js');
const sessionMiddleware = require('./server/middlewares/session.middleware.js');

//constiable
const app = express();
const port = process.env.PORT || 3000;

//app set
app.set('view engine', 'pug');
app.set('views', './server/views');

//app use
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('server/public'));
app.use(cookieParser(process.env.SECRETCOOKIEKEY));
app.use(sessionMiddleware, userloginMiddleware.getUserLogin);
app.use('/api', api);
app.use('/user', authMiddleware.requireAuth, userRoute);
app.use('/login', authMiddleware.requireAuth, loginRoute);
app.use('/register', authMiddleware.requireAuth, registerRoute);
app.use('/friends', authMiddleware.requireAuth, friendsRoute);
app.use('/cart', cartRoute);

//app get
app.use('/social', authMiddleware.requireAuth)
app.get('/social', (req, res) => {
	res.render('social/index', {
		userLogin: res.locals.user,
		quantity: res.locals.quantity,
	});
});

app.get('/', (req, res) => {
	res.render('index', {
		userLogin: res.locals.user,
		name: 'haidao',
		quantity: res.locals.quantity,
	});
});

// app.get('/transfer', async (req, res) => {
// 	try {
// 		await transferDb.readAndSaveDb();
// 		console.log('done');
// 		res.send(200);
// 	} catch(err){
// 		console.error(err);
// 		res.send(400);
// 	}
// });

//app listen
app.listen(port, () => console.log('First App With ExpressJs by Barry(daominhhailaocai) on ' + port));