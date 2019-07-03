const express = require('express');
const router = express.Router();

const userRoute = require('./routes/user.route');
const drugRoute = require('./routes/drug.route');
const sessionRoute = require('./routes/session.route');
const articleRoute = require('./routes/article.route');

router.use('/users', userRoute);
router.use('/drugs', drugRoute);
router.use('/sessions', sessionRoute);
router.use('/articles', articleRoute);

module.exports = router;