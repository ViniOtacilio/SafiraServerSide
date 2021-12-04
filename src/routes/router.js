const express = require('express');
const { createUser } = require('../controllers/registerController');
const { createLancamento } = require('../controllers/lancamentoController');
const { getLancamento } = require('../controllers/lancamentoController');
const { getAllCategories} = require('../controllers/categoriaController');
const { getCategoria } = require('../controllers/categoriaController');
const { getSaldo } = require('../controllers/saldoController');
const { forgotPassword } = require('../utils/passwordReset');
const { resetPassword } = require('../utils/passwordReset');
const { createCustomCategory } = require('../controllers/categoriaController');
const { deleteCustomCategory } = require('../controllers/categoriaController');
const { deleteLancamento } = require('../controllers/lancamentoController');
const { getCategoriaSaldo } = require('../controllers/categoriaController');
const { allCustomCategories } = require('../controllers/categoriaController');
const { createPlanejamento } = require('../controllers/planejamentoController');
const { deletePlanejamento } = require('../controllers/planejamentoController');
const { getPlanejamento } = require('../controllers/planejamentoController');
const { createCard } = require('../controllers/cardController');
const { deleteCard } = require('../controllers/cardController');
const { getCard } = require('../controllers/cardController');
const { alterCard } = require('../controllers/cardController');

const router = express.Router();

router.post('/users/register', createUser);
router.post('/users/novoLancamento', createLancamento);
router.get('/users/lancamento', getLancamento);
router.get('/categorias', getAllCategories) 
router.get('/users/categoria', getCategoria)
router.get('/users/saldo', getSaldo);
router.post('/users/forgotPassword', forgotPassword);
router.post('/users/resetPassword/:token', resetPassword);
router.post('/categorias/createCustomCategory', createCustomCategory);
router.post('/categorias/deleteCustomCategory/:id', deleteCustomCategory);
router.get('/deleteLancamento/:id', deleteLancamento);
router.get('/categorias/saldo', getCategoriaSaldo);
router.get('/categorias/getCustomCategories', allCustomCategories);
router.post('/planejamento/createPlanejamento', createPlanejamento);
router.post('/planejamento/deletePlanejamento', deletePlanejamento);
router.get('/planejamento/getPlanejamento', getPlanejamento);
router.post('/cards/createCard', createCard);
router.post('/cards/deleteCard', deleteCard);
router.post('/cards/updateCard', alterCard);
router.get('/cards/getCard', getCard);


module.exports = router;