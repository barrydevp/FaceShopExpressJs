const db = require('./database');
const userModel = require('./api/models/user.model');
const sessionModel = require('./api/models/session.model');
const drugModel = require('./api/models/drug.model');

// async function push() {
//   let userDoc = await userModel.findOne({username: 'nara'});
//   let userDocs = await userModel.find();
//   // userModel.find({}, (err, data) => {
//   //   if (err) {
//   //     console.error(err);
//   //     return;
//   //   }
//   //   userdoc = data;
//   // });

//   userDoc.friends.push(userDocs[1]._id);
//   userDoc.friends.push(userDocs[2]._id);
//   await userDoc.save()
//   console.log('done');
// }

async function push() {
  let sessionDoc = await sessionModel.findOne({ _id: '5d0f450b1bf0b827885f5cf6'});
  let drug = await drugModel.find();
  // userModel.find({}, (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   userdoc = data;
  // });

  sessionDoc.carts.push({
    infor: drug[0]._id,
    count: 0,
  });
  await sessionDoc.save()
  //console.log(sessionDoc);
  console.log('done');
}

// async function showFriends() {
//   let userDoc = await userModel.findOne({username: 'nara'}).populate('friends', 'fullname avatar email');
//   console.log(userDoc);
// }

async function showFriends() {
  let sessionDoc = await sessionModel.findOne({ _id: '5d0f450b1bf0b827885f5cf6' }).populate('carts.infor');
  //let cartDoc = await sessionDoc.populate("carts.0.infor");
  //console.log(cartDoc);
  console.log(sessionDoc.toObject().carts);
}

async function find() {
  let sessionDoc = await sessionModel.findOne({ _id: '5d0f450b1bf0b827885f5cf6' });
  let cart = await sessionDoc.findOne({'carts.infor._id': '5d0defed42ad4c4f199d4d74'});
  console.log(cart);
}

try {
  //push();
  //showFriends();
  find();
} catch(err) {
  console.log(err);
}