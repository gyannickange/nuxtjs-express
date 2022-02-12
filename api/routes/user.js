const express = require('express');
const router = express.Router();
const {
  getCurrent,
  getUser,
  postUser,
  putUser,
  deleteUser,
  getUserById
} = require('../controllers/user');
const { checkJWTToken } = require('../controllers/auth');

router.get('/current', checkJWTToken, getCurrent);

router.get('/', checkJWTToken, getUser);

router.post('/',  checkJWTToken, postUser);

router.put('/:id',  checkJWTToken, putUser);

router.delete('/:id', checkJWTToken, deleteUser);

router.get('/:id', checkJWTToken, getUserById);

// router.get('/confirmLink/:token', userController.getConfirmtoken);

// router.get('/reset-password', userController.getRestPassword);

// router.post('/forgot-password', userController.postForgetPass);

// router.post('/reset-password/:token', userController.postResetPassword);

// router.post('/update-password', checkJWTToken, userController.postUpdatePassword);

// router.post('/update-email', checkJWTToken, userController.postUpdateEmail);

module.exports = router; 
