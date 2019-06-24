//let db = require('../db.js');
const drugModel = require('../../api/models/drug.model');
const sessionModel = require('../../api/models/session.model');

module.exports.index = async (req, res) => {
  let drugs = [];
  let maxpage = 0;
  let page = 0;
  let firstpage = 1;
  let countmax = 0;

  try {
    drugs = await drugModel.find();
    perpage = 9;
    maxpage = Math.ceil(drugs.length / perpage);
    page = parseInt(req.query.page) || 1;
    countmax = Math.floor(maxpage / 5) ? 5 : maxpage;

    if(page < 1) {
      page = 1;
    } else if(page > maxpage) {
      page = maxpage;
    } 
    
    if (page + 2 > maxpage) {
      firstpage = maxpage - countmax + 1;
    } else {
      firstpage = (page - Math.floor(countmax / 2) > 0) ? (page - Math.floor(countmax / 2)) : 1;
    }

    let start = (page - 1) * perpage;
    drugs = drugs.slice(start, start + perpage);

  } catch(err) {
    console.error(err);
  }

  res.render('cart/index', {
    userLogin: res.locals.user,
    drugs: drugs,
    quantity: res.locals.quantity,
    pagination: {
      page: page,
      countmax: countmax,
      firstpage: firstpage,
      maxpage: maxpage,
    }
  });
};

module.exports.listcart = async (req, res, next) => {
  //let carts = [];
  // const sessionId = req.signedCookies.sessionId;
  // try {
  //   const sessionDoc = await sessionModel.findOne({ _id: sessionId });
  //   if(sessionDoc) {
  //     carts = sessionDoc.toObject().cart;
      
  //     // for (let cart of carts) {
  //     //   // count += cart.count;
  //     // }
  //   }
  // } catch (err) {
  //   console.error(err);
  // }

  res.render('cart/listcart', {
    userLogin: res.locals.user,
    quantity: res.locals.quantity,
  });
}

module.exports.view = async (req, res, next) => {
  const productId = req.params.productId;
  //console.log(productId);
  try {
    const productDoc = await drugModel.findOne({ _id: productId });
    let product = {};
    if(product) {
      productDoc.view += 1;
      product = productDoc.toObject();
    }
    await productDoc.save();
    res.render('cart/view', {
      userLogin: res.locals.user,
      product: product
    });
  } catch(err) {
    console.log(err);
    res.send(404);
  }
  
}

module.exports.create = async (req, res, next) => {
  res.render('cart/create', {
    userLogin: res.locals.user,
    quantity: res.locals.quantity,
  });
}

module.exports.post = async (req, res, next) => {
  const product = req.body;
  let drug = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image, 
    price: {
      original: req.body.price,
      sale: req.body.sale
    }
  }
  //console.log(drug);
  try {
    await drugModel.create(drug);
    res.redirect('/cart/create');
  } catch(err) {
    console.error(err);
    res.redirect('/cart/create');
  }
}

// module.exports.add = async (req, res, next) => {
//   const preUrl = req.signedCookies.preUrl || '/cart';
//   const productId = req.params.productId;
//   const count = parseInt(req.params.count) | 1;
//   //const flavour = req.params.flavour | 'Unflavoured';
//   const sessionId = req.signedCookies.sessionId;

//   if (!sessionId) {
//     res.send('err');
//     //res.redirect(req.originalUrl);
//   }

//   try {
//     //let sessionDoc = await sessionModel.findOne({ _id: sessionId });

//     let sessionDoc = res.locals.sessionDoc;
//     //console.log(sessionDoc);
//     let cartDoc = await sessionDoc.cart.id(productId);
//     if (!cartDoc) {
//       const drugDoc = await drugModel.findOne({ _id: productId });
//       let drug = drugDoc.toObject();
//       drug.count = count;
//       //drug.flavour = flavour;
//       sessionDoc.cart.push(drug);
//     } else {
//       cartDoc.count += count;
//     }

//     await sessionDoc.save();
//   } catch (err) {
//     console.error(err);
//   }

//   //res.redirect(preUrl);
//   res.send('success');
// };

// module.exports.view = async (req, res, next) => {
//   let drugs = [];
//   let indexOfDrugs = 0;
//   let objCarts = res.locals.carts;
//   let cartsId = Object.keys(objCarts).sort();
//   try {
//     if (cartsId) {
//       drugs = await drugModel.find();
//       let indexOfCartsId = 0;
//       drugs = drugs.filter((drug) => {
//         if (drug.id == cartsId[indexOfCartsId]) {
//           drug.count = objCarts[cartsId[indexOfCartsId]];
//           indexOfCartsId++;
//           return true;
//         }
//         return false;
//       });
//     }
//   } catch(err) {
//     console.error(err);
//   }

//   res.render('cart/view', {
//     userLogin: res.locals.user,
//     locals: res.locals,
//     carts: drugs
//   });
// }

// module.exports.deleteCart = async (req, res, next) => {
  
//   const cartId = req.params.cartId;
//   try {
//     await drugModel.deleteOne({ _id: cartId });
//   } catch(err) {
//     console.err(err);
//   }

//   res.redirect('/cart/view');
// }

// module.exports.remove = async (req, res, next) => {
//   // const cartId = req.params.cartId;
//   // const sessionId = req.signedCookies.sessionId;
//   // const preUrl = req.signedCookies.preUrl || '/cart';
//   const productId = req.params.productId;
//   const sessionId = req.signedCookies.sessionId;

//   try {
//     //let sessionDoc = await sessionModel.findOne({ _id: sessionId });
//     let sessionDoc = res.locals.sessionDoc;
//     let cartDoc = await sessionDoc.cart.id(productId);
//     if(cartDoc) {
//       if (cartDoc.count - 1 === 0) {
//         cartDoc.remove();
//       } else {
//         cartDoc.count--;
//       }

//       await sessionDoc.save();
//     }
//   } catch (err) {
//     console.error(err);
//   }

//   res.send(200);
// }