const { pool } = require("../database.js");

const createNewLancamentoQuery = async (
  value,
  tipo_de_transacao,
  userid,
  categoriaid,
  titulo_lancamento,
  comentario,
  is_repetitivo,
  is_parcelado,
  qnd_parcelas,
  dia_cobranca
) => {

  console.log("INSERT INTO lancamentos (value, tipo_de_transacao, userid, categoriaid, titulo_lancamento, data_lancamento, data_ultima_alteracao,comentario, repetitivo, parcelado, qtd_parcela, dia_cobranca) VALUES ( " +value+"," +tipo_de_transacao+","+userid+","+categoriaid+","+titulo_lancamento+","+comentario+","+is_repetitivo+","+is_parcelado+","+qnd_parcelas+","+dia_cobranca)
  pool.query(
    `INSERT INTO lancamentos (value, tipo_de_transacao, userid, categoriaid, titulo_lancamento, data_lancamento, data_ultima_alteracao,comentario, repetido, parcelado, qtd_parcelas, dia_cobranca)
         VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp, $6, $7, $8, $9, $10)`,
    [
      value,
      tipo_de_transacao,
      userid,
      categoriaid,
      titulo_lancamento,
      comentario,
      is_repetitivo,
      is_parcelado,
      qnd_parcelas,
      dia_cobranca
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

module.exports = {
  createNewLancamentoQuery,
  getLancamentoQuery,
    deleteNewLancamentoQuery
};
