const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

require('./startup/logging');
require('./startup/security')(app);
require('./startup/body-parser')(app);
require('./startup/morgan')(app);
require('./startup/passport')(app);
require('./startup/routes')(app);
require('./startup/db')();

module.exports = app
