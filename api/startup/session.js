const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require("connect-mongo");

module.exports = (app) => {
  app.use(cookieParser());
  app.use(session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || `mongodb://localhost/${process.env.DATA_BASE_NAME}`
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    useUnifiedTopology: true
  }));
}