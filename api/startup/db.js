const winston = require('winston');
const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${process.env.DATA_BASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  mongoose.connection.on('open', () => {
    console.log('MongoDB : Connected successfully');
  })
  mongoose.connection.on('error', (err) => {
    console.log(`MongoDB ERROR : ${err}`);
  })
}