const express = require('express');
const { createUser } = require('../controllers/registerController');
const { createLancamento } = require('../controllers/lancamentoController');
const { getLancamento } = require('../controllers/lancamentoController');
const { createSaldo } = require('../controllers/saldoController');
const { getAllCategories } = require('../controllers/categoriaController');


const router = express.Router();

router.post('/users/register', createUser);
router.post('/users/novoLancamento', createLancamento);
router.get('/users/lancamento', getLancamento);
//router.post('/novoSaldo', createSaldo);
router.get('/categorias', getAllCategories )

module.exports = router;