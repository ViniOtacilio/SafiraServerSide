const { getCategories } = require('../services/categoriaService'); 
const { getCategoriaByUser } = require('../services/categoriaService');
const { createNewCustomCategory } = require('../services/categoriaService');
const { deleteNewCustomCategory } = require('../services/categoriaService');

const createCustomCategory = async (req, res, next) => {

    const { user_id, name } = req.body;

    try {
        await createNewCustomCategory(user_id, name);
        res.sendStatus(201);
        next();
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: 'Houve um erro ao criar a categoria' } });
        console.log(e);
    }
}

const deleteCustomCategory = async (req, res, next) => {

    const id  = req.params.id;
    console.log(id);

    try {
        await deleteNewCustomCategory(id);
        res.sendStatus(200);
        next();
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: 'Houve um erro ao deletar a categoria ' + e} });
        console.log(e);
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


module.exports = {
    getAllCategories,
    getCategoria,
    createCustomCategory,
    deleteCustomCategory
}