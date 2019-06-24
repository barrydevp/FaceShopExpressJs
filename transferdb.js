const db = require('./database');
const drugModel = require('./api/models/drug.model');
const sessionModel = require('./api/models/session.model');
const fs = require('fs');

const json = fs.readFileSync('./data.json', 'utf8');
const obj = JSON.parse(json);
let arr = obj.drugs.slice(0,10);

sessionModel.deleteMany().then((err, data) => {
  if(err) console.error(err);
  else console.log(data);
});

// drugModel.create(arr, (err, data) => {
//   console.log('succes');
//   if(err) console.error(err);
//   else console.log(data);
// })