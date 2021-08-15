const express = require('express');
const { createUser } = require('../controllers/registerController');
const { createLancamento } = require('../controllers/lancamentoController');
const { getLancamento } = require('../controllers/lancamentoController');
const { createSaldo } = require('../controllers/saldoController');
const { getAllCategories } = require('../controllers/categoriaController');
const { getSaldo } = require('../controllers/saldoController');


const router = express.Router();

router.post('/users/register', createUser); //Documentado 
router.post('/users/novoLancamento', createLancamento); // Documentado
router.get('/users/lancamento', getLancamento); // Documentado
//router.post('/novoSaldo', createSaldo);
router.get('/categorias', getAllCategories) // Documentado
router.get('/users/saldo', getSaldo); // Documentado

module.exports = router;