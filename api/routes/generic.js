const express = require('express');
const router = express.Router();
const {
  getResources,
  postResource,
  putResource,
  deleteResource,
  getResourceById
} = require('../controllers/generic');

const { checkJWTToken } = require('../controllers/auth');

router.get('/', checkJWTToken, getResources);

router.post('/', checkJWTToken, postResource);

router.put('/:id', checkJWTToken, putResource);

router.delete('/:id', checkJWTToken, deleteResource);

router.get('/:id', checkJWTToken, getResourceById);

module.exports = router;