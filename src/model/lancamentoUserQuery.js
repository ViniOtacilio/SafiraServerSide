const { pool } = require("../database.js");

const createNewLancamentoQuery = async (
  value,
  tipo_de_transacao,
  userid,
  categoriaid,
  titulo_lancamento,
  data_lancamento,
  comentario
) => {
  pool.query(
    `INSERT INTO lancamentos (value, tipo_de_transacao, userid, categoriaid, titulo_lancamento, data_lancamento, data_ultima_alteracao,comentario)
         VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, $7)`,
    [
      value,
      tipo_de_transacao,
      userid,
      categoriaid,
      titulo_lancamento,
      data_lancamento,
      comentario
    ],
    (err, result) => {
      if (err) {
        throw err;
      }
    }
  );
};

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
  createNewLancamentoQuery,
  getLancamentoQuery
};
