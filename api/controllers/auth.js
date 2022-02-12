const passport = require('passport');
require('../services/passport');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

exports.postRegister = async (req, res) => {
  let user = await User.findOne({ phone: req.body.phone });
  if (!user) return res.status(400).send('Numéro de téléphone ou mot de passe invalide.');
  if (user.role !== 'user') return res.status(400).send('Autorisation refusée.');

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  update = await User.findByIdAndUpdate(user.id,
    {
      fullname: req.body.fullname,
      phone: req.body.phone,
      password: req.body.password,
      role: req.body.role,
    }, { new: true });
  
  let payload = { id: user._id };
  let token = generateToken(payload);

  res.send({
    user: _.pick(update, ['_id', 'fullname', 'phone']),
    token: token
  });
};

exports.postRegisterAdmin = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send('Numéro de téléphone déjà enregistré.');

  user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user.password = await hashPassword(user.password);
  await user.save();

  let payload = { id: user._id };
  let token = generateToken(payload);

  res.send({
    user: _.pick(user, ['_id', 'username']),
    token: token
  });
};

exports.postLogin = async (req, res) => {
  let user = await User.findOne({ phone: req.body.phone });
  if (!user) return res.status(400).send('Numéro de téléphone ou mot de passe invalide.');
  if (user.role !== 'user') return res.status(400).send('Autorisation refusée.');

  const validPassword = await comparePassword(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Numéro de téléphone ou mot de passe invalide.');

  let payload = { id: user._id };
  let token = generateToken(payload);

  res.send({
    user: _.pick(user, ['_id', 'fullname', 'phone']),
    token: token
  });
};

exports.postLoginAdmin = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Numéro de téléphone ou mot de passe invalide.');
  if (user.role === 'user') return res.status(400).send('Autorisation refusée.');

  const validPassword = await comparePassword(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Numéro de téléphone ou mot de passe invalide.');

  let payload = { id: user._id };
  let token = generateToken(payload);

  res.send({
    user: _.pick(user, ['_id', 'username']),
    token: token
  });
};

exports.postLogout = async (req, res) => {
  
};

const comparePassword = async (currentPassword, userPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};

const hashPassword = async (userPassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(userPassword, salt);
};

const generateToken = async (payload) => {
  return await jwt.sign(payload, process.env.SESSION_SECRET, {
    expiresIn: "2h",
  });
};

exports.comparePassword = comparePassword;
exports.hashPassword = hashPassword;
exports.checkJWTToken = passport.authenticate('jwt', { session: false });