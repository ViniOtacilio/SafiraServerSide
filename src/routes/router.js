const express = require('express');
const { registerController } = require('../controllers/registerController');
const { createUser } = require('../controllers/registerController');


const router = express.Router();

router.post('/users/register', createUser);

module.exports = router;