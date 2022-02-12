const express = require('express');
const resources = require('../../resources');
const user = require('../routes/user');
const generic = require('../routes/generic');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = (app) => {
  app.use(express.json());
  resources.tables.forEach(table => {
    app.use(`/v1/${table.name}`, generic);
  });
  app.use('/v1/users', user);
  app.use('/auth', auth);
  
  app.use(error);
}