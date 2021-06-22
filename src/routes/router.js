const express = require('express');
//const { registerController } = require('../controllers/registerController');
const { createUser } = require('../controllers/registerController');
const { loginUser } = require('../controllers/loginController');

const router = express.Router();

router.post('/users/register', createUser);
router.post('/users/login', loginUser);

module.exports = router;