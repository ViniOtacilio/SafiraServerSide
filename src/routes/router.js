const express = require('express');
const { createUser } = require('../controllers/registerController');
const { createLancamento } = require('../controllers/lancamentoController');

const router = express.Router();

router.post('/users/register', createUser);
router.post('/users/novoLancamento', createLancamento);

module.exports = router;