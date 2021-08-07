const express = require('express');
const { createUser } = require('../controllers/registerController');
const { createLancamento } = require('../controllers/lancamentoController');
const { getLancamento } = require('../controllers/lancamentoController');
const { createSaldo } = require('../controllers/saldoController');
const { getAllCategories } = require('../controllers/categoriaController');
const { getCategoria } = require('../controllers/categoriaController');
const { getSaldo } = require('../controllers/saldoController');


const router = express.Router();

router.post('/users/register', createUser);
router.post('/users/novoLancamento', createLancamento);
router.get('/users/lancamento', getLancamento);
//router.post('/novoSaldo', createSaldo);
router.get('/categorias', getAllCategories)
router.get('/users/categoria', getCategoria)
router.get('/users/saldo', getSaldo);

module.exports = router;