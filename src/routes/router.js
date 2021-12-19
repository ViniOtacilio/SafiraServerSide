const express = require('express');

const { createUser } = require('../controllers/registerController');
const { forgotPassword } = require('../utils/passwordReset');
const { resetPassword } = require('../utils/passwordReset');

const { getSaldo } = require('../controllers/saldoController');

const { createLancamento } = require('../controllers/lancamentoController');
const { deleteLancamento } = require('../controllers/lancamentoController');
const { getLancamento } = require('../controllers/lancamentoController');

const { createCustomCategory } = require('../controllers/categoriaController');
const { deleteCustomCategory } = require('../controllers/categoriaController');
const { getAllCategories} = require('../controllers/categoriaController');
const { getCategoria } = require('../controllers/categoriaController');
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

//usuario
router.post('/users/register', createUser);
router.post('/users/forgotPassword', forgotPassword);
router.post('/users/resetPassword/:token', resetPassword); //talvez tenha que virar um patch?

//saldo
router.get('/users/saldo', getSaldo);

//lancamento
router.post('/users/lancamento', createLancamento);
router.delete('/users/lancamento/:id', deleteLancamento);
router.get('/users/lancamento', getLancamento);

//categorias
router.post('/users/categoria', createCustomCategory);
router.delete('/users/categoria/:id', deleteCustomCategory);
router.get('/users/categoria', getAllCategories);
router.get('/users/categoria/lancamentos', getCategoria);
router.get('/users/categoria/saldo', getCategoriaSaldo);
router.get('/users/categoria/customCategories', allCustomCategories);

//planejamento
router.post('/users/planejamento', createPlanejamento);
router.delete('/users/planejamento', deletePlanejamento);
router.get('/users/planejamento', getPlanejamento);

//cartoes
router.post('/users/cards', createCard);
router.delete('/users/cards', deleteCard);
router.get('/users/cards', getCard);
router.patch('/users/cards', alterCard);


module.exports = router;
