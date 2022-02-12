const xss = require('xss-clean');
const helmet = require('helmet');

module.exports = (app) => {
  app.use(helmet());
  app.use(xss());
}