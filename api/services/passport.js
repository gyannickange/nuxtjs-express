const passport    = require('passport');
const JwtStrategy   = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SESSION_SECRET;

const { User } = require('../models/user');

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, cb) {
    return User.findOne({username, password})
      .then(user => {
        if (!user) {
          return cb(null, false, {message: 'Incorrect username or password.'});
        }

        return cb(null, user, {
          message: 'Logged In Successfully'
        });
      })
      .catch(err => {
        return cb(err);
      });
  }
));

passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: 'Email ou Mot de Passe Incorrect.' });
    }

    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      done(err, null);
    }
    
    return done(err, user);
  });
});
