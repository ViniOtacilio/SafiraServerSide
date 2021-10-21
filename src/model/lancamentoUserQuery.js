const { pool } = require("../database.js");

const createNewLancamentoQuery = async (
  value,
  tipo_de_transacao,
  userid,
  categoriaid,
  titulo_lancamento,
  comentario
) => {
  pool.query(
    `INSERT INTO lancamentos (value, tipo_de_transacao, userid, categoriaid, titulo_lancamento, data_lancamento, data_ultima_alteracao,comentario)
         VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp, $6)`,
    [
      value,
      tipo_de_transacao,
      userid,
      categoriaid,
      titulo_lancamento,
      comentario
    ],
    (err, result) => {
      if (err) {
        throw err;
      }
    }
  );
};

const deleteNewLancamentoQuery = async (id) => {
    pool.query(
        `DELETE FROM lancamentos WHERE
         id = $1`,
        [
            id
        ],
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )
}

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

const repeateLancamentos = async (query) => {
    pool.query(
        `INSERT INTO lancamentos (value,tipo_de_transacao,userid,categoriaid,titulo_lancamento,comentario) SELECT value,tipo_de_transacao,userid,categoriaid,titulo_lancamento,comentario FROM lancamentos WHERE repetido = true
        `,
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )
}


module.exports = {
  createNewLancamentoQuery,
  getLancamentoQuery,
    deleteNewLancamentoQuery,
    repeateLancamentos
};
