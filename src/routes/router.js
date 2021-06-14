const express = require('express');

const { registerController } = require('../controllers/registerController');

const router = express.Router();

router.post('/users/register', registerController.createUser);

module.exports = router