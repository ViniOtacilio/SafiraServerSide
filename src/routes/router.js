const express = require('express');
const { createUser } = require('../controllers/registerController');
const { createLancamento } = require('../controllers/lancamentoController');
const { getLancamento } = require('../controllers/getlancamentoController');

const router = express.Router();

router.post('/users/register', createUser);
router.post('/users/novoLancamento', createLancamento);
router.get('/users/lancamento', getLancamento);

module.exports = router;