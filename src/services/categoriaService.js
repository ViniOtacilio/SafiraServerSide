const getCategoriaQuery = require("../model/categoriasQuery");

const getCategories = async () => {
  let errors = [];

    // Retornando categorias
    getCategoriaQuery.getCategoriaQuery();

};

module.exports = {
    getCategories,
};
