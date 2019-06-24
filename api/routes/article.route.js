//import module
var express = require('express');
var controller = require('../controllers/article.controller.js')

//variable
var router = express.Router();

//route get data
router.get('/article', controller.getArticle);
router.get('/article/:articleId', controller.getArticleById);
router.get('/comment', controller.getComment);
router.get('/commnet/:commnetId', controller.getCommentById);

//route post data
router.post('/article', controller.postArticle);
router.post('/comment', controller.postComment);

//route patch data to update and only update
router.patch('/article/:articleId', controller.patchArticle);
router.patch('/comment/:commentId', controller.patchComment);
router.patch('/:articleId/addcomment', controller.addComment);

//route put data to update or create data if not exists

//route delete data
router.delete('/article/:articleId', controller.deleteArticleById);
router.delete('/:articleId/delcomment/:commentId', controller.delComment);

module.exports = router;