const { pool } = require("../database.js");

const createNewPlanejamentoQuery = async (user_id, mes, categoria_id, value) => {

    return new Promise(function(resolve, reject) {
        pool.query(`INSERT INTO planejamento(user_id, mes, categoria_id, value)
        values($1,$2,$3,$4)`,
       [
           user_id,
           mes,
           categoria_id,
           value
       ],
       (err, result) => {
           if (err) {
               console.log('err ' + err.detail);
               reject(err.detail);
            }
            resolve();
            }
        ) 
        }
    )
}


const deleteNewPlanejamentoQuery = async (user_id, mes, categoria_id) => {
    pool.query(
        `DELETE FROM planejamento WHERE
         user_id = $1 AND mes = $2 AND categoria_id = $3`,
        [
            user_id,
            mes,
            categoria_id
        ],
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )
}

const getPlanejamentoQuery = async (query) => {
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
    createNewPlanejamentoQuery,
    deleteNewPlanejamentoQuery,
    getPlanejamentoQuery
};