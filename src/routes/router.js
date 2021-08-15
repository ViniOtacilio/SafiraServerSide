const express = require('express');
const { createUser } = require('../controllers/registerController');
const { createLancamento } = require('../controllers/lancamentoController');
const { getLancamento } = require('../controllers/lancamentoController');
const { createSaldo } = require('../controllers/saldoController');
const { getAllCategories } = require('../controllers/categoriaController');
const { getCategoria } = require('../controllers/categoriaController');
const { getSaldo } = require('../controllers/saldoController');
const { forgotPassword } = require('../utils/passwordReset');
const { resetPassword } = require('../utils/passwordReset');


const router = express.Router();

router.post('/users/register', createUser); // Documentado
router.post('/users/novoLancamento', createLancamento); // Documentado
router.get('/users/lancamento', getLancamento); // Documentado
router.get('/categorias', getAllCategories) // Documentado
router.get('/users/categoria', getCategoria)
router.get('/users/saldo', getSaldo); // Documentado
router.post('/users/forgotPassword', forgotPassword); // Não Documentado
router.post('/users/resetPassword/:token', resetPassword); // Não Documentado

module.exports = router;