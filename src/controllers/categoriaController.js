const { getCategories } = require('../services/categoriaService'); 


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

module.exports = {
    getAllCategories
}