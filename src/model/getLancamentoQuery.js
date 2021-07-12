const { pool } = require("../database.js");

const getLancamentoQuery = async (query) => {
    return new Promise(function(resolve, reject) {
        console.log('In model: '+ query);

         pool.query(query, (err, result) => {
            if (err) {
                throw (err) ;
            }
         console.log(result.rows);
            resolve (result.rows) ;
            })
       
        })        
};

module.exports = {
    getLancamentoQuery,
};