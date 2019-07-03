// var db = require('../db');
const sessionModel = require('../../api/models/session.model');
const drugModel = require('../../api/models/drug.model');

module.exports = async (req, res, next) => {
  
  const sessionId = req.signedCookies.sessionId;
 
  if(!sessionId) {
    res.redirect(req.originalUrl);
  }
  if (res.locals.sessionDoc){
    let sessionDoc = res.locals.sessionDoc;
    //console.log(carts);
    if (sessionDoc) {
      const sessionObj = sessionDoc.toObject();
      res.locals.carts = sessionObj.cart;
      for (let cart of sessionObj.cart) {
        count += cart.count;
      }
    }
  } else {
    try {
      let sessionDoc = await sessionModel.findOne({_id : sessionId });
      //console.log(sessionDoc);
      res.locals.sessionDoc = sessionDoc;
      if (sessionDoc) {
        const sessionObj = sessionDoc.toObject();
        res.locals.carts = sessionObj.cart;
        for (let cart of sessionObj.cart) {
          count += cart.count;
        }
      }
    } catch(err) {
      console.error(err);
    }
  }
  res.locals.countCart = count;

  next();
}