//import module
const drugModel = require('../models/drug.model');
const sessionModel = require('../models/session.model');

//get method
module.exports.getAll = async (req, res, next) => {
  let sessionArr = [];
  try {
    sessionDocs = await sessionModel.find();
    sessionArr = Array.from(sessionDocs);
  } catch(err) {
    console.error(err);

  }

  res.json(sessionArr);
}

module.exports.getById = async (req, res, netx) => {
  let sessionObj = {};
  const sessionId = req.params.sessionId;
  try {
    sessionDoc = await sessionModel.findOne({ _id: sessionId });
    sessionObj = sessionDoc.toObject();
  } catch(err) {
    console.error(err);
  }

  res.json(sessionObj);
}

module.exports.getListCart = async (req, res, next) => {
  const sessionId = req.signedCookies.sessionId;
  //console.log(sessionId);
  let data = [];
  if(sessionId) {
    try {
      let sessionDoc = await sessionModel.findOne({ _id: sessionId }).populate('carts.infor');
      //console.log(sessionDoc);
      data = sessionDoc.toObject().carts;
      //console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  res.json(data);
}

// module.exports.getListCart = async (req, res, next) => {
//   const sessionId = req.signedCookies.sessionId;
//   //console.log(sessionId);
//   let data = [];
//   if(sessionId) {
//     try {
//       let sessionDoc = await sessionModel.findOne({ _id: sessionId });
//       //console.log(sessionDoc);
//       data = sessionDoc.toObject().cart;
//       //console.log(data);
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   res.json(data);
// }

//post method
/*\ create new session ID \*/
module.exports.post = async (req, res, next) => {
  try {
    const sessionDoc = sessionModel.create({ cart: [] });
    res.json(sessionDoc.toObject());
  } catch(err) {
    console.log(data);
    res.send(404);
  }

}

//put method(update) 
module.exports.put = async (req, res, next) => {
  const sessionId = req.params.sessionId;
  const sessionIdObj = req.body;
  try {
    await sessionModel.findOneAndUpdate({_id : sessionId }, sessionIdObj);
    res.send(200);
  } catch(err) {
    console.log(err);
    res.send(404);
  }
}

module.exports.addToCart = async (req, res, next) => {
  const sessionId = req.signedCookies.sessionId;
  const productId = req.params.productId;
  const count = parseInt(req.params.count) || 1;
  let quantity = res.locals.quantity;
  //const flavour = req.params.flavour | 'Unflavoured';
  
  try {
    const [drugDoc, sessionDoc] = await Promise.all([drugModel.findOne({ _id: productId }), sessionModel.findOne({ _id: sessionId })]);
    let cartDoc = await sessionDoc.carts.id(productId);
    console.log(cartDoc);
    if (!cartDoc) {
      if(drugDoc){
        let cart = {
          _id: drugDoc._id,
          infor: drugDoc._id
        };
        cart.count = count;
        sessionDoc.carts.push(cart);
        quantity += count;
      }
    } else {
      cartDoc.count += count;
      quantity += count;
    }

    const sessionObj = sessionDoc.toObject();
    await sessionDoc.save();
    res.cookie('quantity', quantity, {
      signed: true
    });
    res.json(sessionObj);
  } catch(err) {
    console.error(err);
    res.send(404);
  }
  
}

// module.exports.addToCart = async (req, res, next) => {
//   const sessionId = req.signedCookies.sessionId;
//   const productId = req.params.productId;
//   const count = parseInt(req.params.count) || 1;
//   let quantity = res.locals.quantity;
//   //const flavour = req.params.flavour | 'Unflavoured';
  
//   try {
//     const [drugDoc, sessionDoc] = await Promise.all([drugModel.findOne({ _id: productId }), sessionModel.findOne({ _id: sessionId })]);
//     let cartDoc = await sessionDoc.cart.id(productId);
//     console.log(cartDoc);
//     if (!cartDoc) {
//       let drugObj = drugDoc.toObject();
//       drugObj.count = count;
//       sessionDoc.cart.push(drugObj);
//       quantity += count;
//     } else {
//       cartDoc.count += count;
//       quantity += count;
//     }

//     const sessionObj = sessionDoc.toObject();
//     await sessionDoc.save();
//     res.cookie('quantity', quantity, {
//       signed: true
//     });
//     res.json(sessionObj);
//   } catch(err) {
//     console.error(err);
//     res.send(404);
//   }
  
// }

//delete method
module.exports.deleteById = async (req, res, next) => {
  const sessionId = req.params.sessionId;
  try {
    await sessionModel.deleteOne({_id : sessionId });
    res.send(200);
  } catch(err) {
    console.error(err);
    res.send(404);
  }
}

module.exports.deleteAll = async (req, res, next) => {
  try {
    await sessionModel.remove();
    res.send(200);
  } catch(err) {
    console.error(err);
    res.send(404);
  }
  
}

module.exports.deteleInCart = async (req, res, next) => {
  const count = req.params.count || 1;
  const sessionId = req.signedCookies.sessionId;
  const productId = req.params.productId;
  let quantity = res.locals.quantity;

  if(!sessionId || !productId) {
    res.send(404);
  }
  
  try {
    const sessionDoc = await sessionModel.findOne({ _id: sessionId }).populate('carts.infor');
    let cartDoc = await sessionDoc.carts.id(productId);
    if (cartDoc) {
      if (cartDoc.count - count <= 0) {
        cartDoc.remove();
        quantity -= cartDoc.count;
      } else {
        cartDoc.count -= count;
        quantity -= count;
      }
      res.cookie('quantity', quantity, {
        signed: true
      });
      await sessionDoc.save();
      let data = sessionDoc.toObject().carts;
      //console.log(data);
      res.json(data);
    }
  } catch (err) {
    console.error(err);
    res.send(404);
  }

  
}