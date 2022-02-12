const express = require('express');
const router = express.Router();
const {
  postRegister,
  postLogin,
  postRegisterAdmin,
  postLoginAdmin
} = require('../controllers/auth');

router.post('/register', postRegister);

router.post('/login', postLogin);

router.post('/register/admin', postRegisterAdmin);

router.post('/login/admin', postLoginAdmin);

router.post('/logout', postLogout);

module.exports = router;
