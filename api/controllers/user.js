const { User } = require('../models/user');
const mail = require('../services/mail');
const { getPaginate } = require('../services/pagination');
const { comparePassword, hashPassword } = require('../controllers/auth');

const { v4: uuidv4 } = require('uuid');
const shortid = require('shortid');
const _ = require('lodash');

exports.getCurrent = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password -confirmationToken')

  res.send({user: user});
};

exports.getUser = async (req, res) => {
  let data;
  if (!req.query.all_items) {
    data = await getPaginate(User, req.query.page || 1, 2)
  } else {
    data = await User.find().sort('-createdAt').select('-password -confirmationToken');
  }

  res.send({users: data});
};

exports.postUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Email déjà enregistré.');

  let phone = await User.findOne({ phonenumber: req.body.phonenumber });
  if (phone) return res.status(400).send('Numéro de téléphone déjà enregistré.');

  user = new User({
    fullname: req.body.fullname,
    phone: req.body.phone,
    password: shortid.generate(),
    role: req.body.role,
  });

  const generatedPass = user.password
  user.password = await hashPassword(user.password);
  await user.save();

  res.send({
    user: _.pick(user, [
      '_id', 'fullname', 'phone',
      , 'role',
    ]),
    generatedPass: `L\'admin a été correctement créé avec pour mot de passe ${generatedPass} . Copier avant de récharger la page`
  });
};

exports.putUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id,
    {
      fullname: req.body.fullname,
      phone: req.body.phone,
    }, { new: true });

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  const validPassword = await comparePassword(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Mot de passe invalide.');

  await user.save();
  
  res.send({
    user: _.pick(user, [
      '_id', 'fullname', 'phone', 'role',
    ]),
  });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password -confirmationToken')
  
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send({
    user: user,
    currentUser: req.role
  });
};

exports.getConfirmtoken = async (req, res) => {
  let params = {
    confirmed: true,
    confirmationToken: undefined
  }

  const user = await User.findOne({ confirmationToken: req.params.token });
  if (!user) return res.status(404).send('Token invalid');
  
  const update = await User.findByIdAndUpdate(user._id, params)
  if (!update) return res.status(404).send('Token invalid');

  res.send('Votre compte à été correctement validé.');
};

exports.getRestPassword = async (req, res) => {
  const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) return res.status(404).send('Requète invalide ou expiré.');
  
  res.send({
    user: user,
    token: req.params.token,
  });
};

exports.postForgetPass = async (req, res) => {
  let params = {
    resetPasswordToken: uuidv4(),
    resetPasswordExpires: Date.now() + 3600000,
  }

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(404).send('Aucun compte avec cette adresse email n\'existe.');
  
  user = await User.findByIdAndUpdate(user._id, params)

  await mail.sendMail('forgot-password', req.body.email, 'Mot de passe oublié', {
    resetLink: `${process.env.APP_URL}/reset-password/${params.resetPasswordToken}`
  })

  res.send(`Un Email a été envoyé à ${req.body.email}`);
};

exports.postResetPassword = async (req, res) => {
  let confirmPassword = req.body.confirmPassword;
  let newPassword = req.body.password;

  if (newPassword != confirmPassword) {
    return res.status(404).send('Les mots de ne sont ne pas identiques!') ;
  }

  let user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
  if (!user) return res.status(404).send('Requète invalide ou expiré.');

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  
  user = await User.findByIdAndUpdate(user._id, user);
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(`Mot de passe réinitialiser! Veuillez vous connecter`);
};

exports.postUpdatePassword = async (req, res) => {
  console.log(req.body, 'req.body')
  let currentPassword = req.body.currentPassword;
  let newPassword = req.body.newPassword;
  let confirmPassword = req.body.confirmPassword;

  let user = await User.findById(req.user);
  
  const validPassword = await comparePassword(currentPassword, user.password);
  if (!validPassword) return res.status(400).send('Mot de passe invalide.');
  
  if (newPassword != confirmPassword) {
    return res.status(400).send(`Les nouveaux passwords ne sont pas identiques!`);
  }

  const salt = await bcrypt.genSalt(10);
  newPassword = await bcrypt.hash(newPassword, salt);

  user = await User.findByIdAndUpdate(req.user, {
    password: newPassword
  });

  res.send('user');
};

exports.postUpdateEmail = async (req, res) => {
  var currentemail = req.body.currentemail;
  var newemail = req.body.newemail;
  var password = req.body.password;

  let user = await User.findOne({ email: currentemail });
  if (!user) return res.status(400).send(`Le mot de passe ou l\'adresse e-mail est erroné!`);

  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) return res.status(400).send('Mot de passe invalide.');

  exist = await User.findOne({ email: newemail });
  if (exist) return res.status(400).send('L\'adresse e-mail est déjà utilisé');

  user = await User.findByIdAndUpdate(req.user, { email: newemail });

  res.send(user);
};