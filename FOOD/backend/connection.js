require('dotenv').config();

const mongoose = require('mongoose');

const connectionStr = 'mongodb+srv://itpdb:itpt69@wishwa.dgwe367.mongodb.net/mern_food ';

mongoose.connect(connectionStr, {useNewUrlparser: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})
