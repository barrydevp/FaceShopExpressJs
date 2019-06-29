const db = require('./database');
const drugModel = require('./api/models/drug.model');
const sessionModel = require('./api/models/session.model');
const fs = require('fs');

// const json = fs.readFileSync('./data.json', 'utf8');
// const arr = Array.from(JSON.parse(json));
//console.log(arr);
//console.log(typeof arr);

//let data = getDataFromDb()

async function getDataFromDb() {
  try{
    let drugDoc = await drugModel.find();
    let data = Array.from(drugDoc).map((item) => {
      return {
        name: item.name,
        description: item.description,
        image: item.image,
        price: {
          original: item.price.original,
          sale: item.price.sale || 0
        },
        view: 0
      }
    });
    console.log(data);
    fs.writeFileSync('./data.json', JSON.stringify(data));
    return data;
  }
  catch(err) {
    console.error(err);
  }
}


async function readAndSaveDb() {
  try {
    const json = fs.readFileSync('./data.json', 'utf8');
    const arr = Array.from(JSON.parse(json));
    await drugModel.insertMany(arr);
  } catch(err) {
    console.error(err);
  }
}

module.exports.readAndSaveDb = readAndSaveDb;
// sessionModel.deleteMany().then((err, data) => {
//   if(err) console.error(err);
//   else console.log(data);
// });

// drugModel.create(arr, (err, data) => {
//   console.log('succes');
//   if(err) console.error(err);
//   else console.log(data);
// })