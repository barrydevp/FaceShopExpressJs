// var shortid = require('shortid');
// var db = require('../db.js');
const sessionModel = require('../../api/models/session.model');
const drugModel = require('../../api/models/drug.model');

module.exports = async (req, res, next) => {
  //contain current path url
  //console.log((req.path).indexOf('/api') !== -1);
  let invalidPreUrl = req.path == '/user/logout' || req.path == '/login' || req.path == '/register' || (req.path).indexOf('/api') !== -1
  if (!invalidPreUrl)
    res.cookie('preUrl', req.originalUrl, {
      signed: true
    });
  //console.log(req.originalUrl);
  //console.log(req.signedCookies.preUrl);
  if(!req.signedCookies.sessionId) {
    try {
      //await sessionModel.deleteMany();
      let sessionDoc = await sessionModel.create({cart: []}); 
      res.cookie('sessionId', sessionDoc._id, {
        signed: true
      });
      res.cookie('quantity', 0, {
        signed: true
      });
    } catch(err) {
      console.error(err);
    }
  }

  res.locals.quantity = parseInt(req.signedCookies.quantity);

  next();
}