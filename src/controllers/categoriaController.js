const { getCategories } = require('../services/categoriaService'); 
const { getCategoriaByUser } = require('../services/categoriaService');
const { createNewCustomCategory } = require('../services/categoriaService');
const { deleteNewCustomCategory } = require('../services/categoriaService');
const { getSaldo } = require('../services/categoriaService');
const { getAllCustomCategories } = require('../services/categoriaService');

const createCustomCategory = async (req, res, next) => {

    const { user_id, newCategoryName } = req.body;

    try {
        await createNewCustomCategory(user_id, newCategoryName);
        res.status(201);
        next();
    }
    catch (e) {
        console.log('erro CATEGORIA: ' + e);
        return res.status(500).send({ success: false, error: { message: e } });
    }
}

const deleteCustomCategory = async (req, res, next) => {

    const id  = req.params.id;

    try {
        await deleteNewCustomCategory(id);
        res.sendStatus(200);
        next();
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: e} });
        console.log(e);
    }
}

const allCustomCategories = async (req, res, next) => {

    const user_id = req.query.user_id;
    try {
        let customCategories = await getAllCustomCategories(user_id);
        res.send(customCategories);
        next();
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: e} });
    }
}

const getAllCategories = async(req, res, next) => {
    try {
        let categories = await getCategories();
        console.log(categories);
        // res.send(categories);
        res.sendStatus(200).send(categories)
        // res.sendStatus(201);
        next();
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const getCategoria = async (req, res, next) => {

    const user_id = req.query.user_id;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    console.log("Dentro do Controller de getlancamento:" + user_id + "-" + start_date + "-" + end_date);

    try {
        result = await getCategoriaByUser( user_id, start_date, end_date)
        console.log('controller:');
        console.log(result);
        res.send(result);
        next();
    }
    catch (e) { 
        console.log(e)
        res.send({
            message:e
         });
    }
}

const getCategoriaSaldo = async (req, res, next) => {

    const user_id = req.query.user_id;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    console.log("Dentro do Controller de getCategoriaSaldo:" + user_id + "-" + start_date + "-" + end_date);

    try {
        result = await getSaldo( user_id, start_date, end_date)
        console.log('controller:');
        console.log(result);
        res.send(result);
        next();
    }
    catch (e) { 
        console.log(e)
        res.send({
            message:e
         });
    }
}

module.exports = {
    getAllCategories,
    getCategoria,
    createCustomCategory,
    deleteCustomCategory,
    getCategoriaSaldo,
    allCustomCategories
}