const { getCategories } = require('../services/categoriaService'); 
const { getCategoriaByUser } = require('../services/categoriaService'); 

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
    getCategoria
}