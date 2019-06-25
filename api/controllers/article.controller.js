const articleModel = require('../models/article.model');
const commentModel = require('../models/comment.model');

//get method 
module.exports.getArticle = async (req, res, next) => {
  let data = [];

  try {
    let articleDoc = await articleModel.find().sort('-date').populate('author')
      .populate({
        path: 'comments',
        options: {
          sort: { 'date': -1 },
          limit: 5
        },
        populate: {
          path: 'author', 
        }
    });
    if(articleDoc) {
      data = Array.from(articleDoc);
    }
  } catch (err) {
    console.error(err);
  }

  res.json(data);
}

module.exports.getComment = async (req, res, next) => {
  let data = [];

  try {
    let commnetDoc = await commentModel.find().sort('-date').populate('author');
    if (commentDoc) {
      data = Array.from(commnetDoc);
    }
  } catch (err) {
    console.error(err);
  }

  res.json(data);
}

module.exports.getArticleById = async (req, res, next) => {
  let data;
  const articleId = req.params.articleId;

  try {
    data = await articleModel.findOne({ _id: articleId }).populate('author')
      .populate({
        path: 'comments',
        options: {
          sort: { 'date': -1 },
        },
        populate: {
          path: 'author',
        }
      });
  } catch (err) {
    console.error(err);
  }

  res.json(data);

}

module.exports.getCommentById = async (req, res, next) => {
  let data;
  const commentId = req.params.commentId;

  try {
    data = await commentModel.findOne({ _id: commentId }).populate('author');
  } catch (err) {
    console.error(err);
  }

  res.json(data);

}

//post method
module.exports.postArticle = async (req, res, next) => {
  let articleObj = req.body;
  const userId = req.signedCookies.userId;
  articleObj.author = userId;
 // console.log(articleObj);

  try {
    const articleDoc = await articleModel.create(articleObj);
    if(articleDoc) {
      const articleObj = articleDoc.toObject();
      console.log(articleObj);
      res.send(articleObj);
    }
    else res.send(404);
  } catch (err) {
    console.error(err);
    res.send(404);
  }

  
}

module.exports.postComment = async (req, res, next) => {
  let commnetObj = req.body;
  const userId = req.signedCookies.userId;
  commnetObj.author = userId;
  //console.log(commnetObj);
  let message = "";

  try {
    const commentDoc = await commentModel.create(commnetObj);
    if (commentDoc) {
      const commentObj = commentDoc.toObject();
      res.send(commentObj);
    } else res.send(404);
  } catch (err) {
    console.error(err);
    res.send(404);
  }

  //res.send(message);
}


//patch method
module.exports.patchArticle = async (req, res, next) => {
  let articleObj = req.body;
  const articleId = req.params.articleId;
  articleObj.date = Date.now();

  try {
    const newArticleDoc = await articleModel.findByIdAndUpdate(articleId, articleObj)
    res.send(200);
  } catch (err) {
    console.error(err);
    res.send(404);
  }

}

module.exports.patchComment = async (req, res, next) => {
  let commentObj = req.body;
  const commentId = req.params.commentId;
  commentObj.date = Date.now();

  try {
    const newCommentDoc = await commentModel.findByIdAndUpdate(commentId, commentObj);
    res.send(200);
  } catch (err) {
    console.error(err);
    res.send(404);
  }

}

module.exports.addComment = async (req, res, next) => {
  let commentObj = req.body;
  const userId = req.signedCookies.userId;
  commentObj.author = userId;
  const articleId = req.params.articleId;

  try {
    const commentDoc = await commentModel.create(commentObj);
    //console.log(commentDoc);
    if(commentDoc){
      const articleDoc = await articleModel.findByIdAndUpdate(articleId,
        { $push: { comments : commentDoc._id },
          $set: { date: Date.now() }
        },
        { safe: true },
      );
      if(articleDoc){
        commentObj = commentDoc.toObject();
        //console.log(commentObj);
        res.json(commentObj);
      } else res.send(400);
    } else res.send(404);
  } catch (err) {
    console.error(err);
    res.send(404);
  }

}

//delete method
module.exports.deleteArticleById = async (req, res, next) => {
  const articleId = req.params.articleId;

  try {
    const articleDoc = await articleModel.findByIdAndDelete(articleId);
    await commentModel.remove({_id : { $in: articleDoc.comments}});
    res.send(200);
  } catch (err) {
    console.error(err);
    res.send(400);
  }
  
}

module.exports.delComment = async (req, res, next) => {
  const articleId = req.params.articleId;
  const commentId = req.params.commentId;

  try {
    const commentDoc = await commentModel.findByIdAndDelete(commentId);
    if (commentDoc) {
      const articleDoc = await articleModel.findByIdAndUpdate(articleId,
        {
          $pull: { comments : commentId },
          $set: { date: Date.now() }
        },
        { safe: true }
      );
      //console.log(articleDoc);
      if (articleDoc){
        res.send(200);
      } else res.send(400);
    } else res.send(400);
  } catch (err) {
    console.error(err);
    res.send(400);
  }

}