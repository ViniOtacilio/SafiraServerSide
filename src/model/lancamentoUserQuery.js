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
  qnt_parcelas,
  dia_cobranca,
  card_id,
  data_lancamento
) => {

  return new Promise(function(resolve, reject) {
    console.log("INSERT INTO lancamentos (value, tipo_de_transacao, userid, categoriaid, titulo_lancamento, data_lancamento, data_ultima_alteracao,comentario, repetitivo, parcelado, qtd_parcela, dia_cobranca) VALUES ( " +value+"," +tipo_de_transacao+","+userid+","+categoriaid+","+titulo_lancamento+","+comentario+","+is_repetitivo+","+is_parcelado+","+qnt_parcelas+","+dia_cobranca, +","+card_id)
    pool.query(
      `INSERT INTO lancamentos (value, tipo_de_transacao, userid, categoriaid, titulo_lancamento, data_lancamento, data_ultima_alteracao,comentario, repetido, parcelado, qtd_parcelas, dia_cobranca, card_id)
           VALUES ($1, $2, $3, $4, $5, $12, current_timestamp, $6, $7, $8, $9, $10, $11)`,
      [
        value,
        tipo_de_transacao,
        userid,
        categoriaid,
        titulo_lancamento,
        comentario,
        is_repetitivo,
        is_parcelado,
        qnt_parcelas,
        dia_cobranca,
        card_id,
        data_lancamento
      ],
 (err, result) => {
        if (err) {
            reject (err);
        }
        resolve () ;
        })
    })
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
      pool.query(query, (err, result) => {
        //console.log("Query recebida pelo model  " + query);
        if (err) {
          reject (err) ;
        }
        if(typeof result !== 'undefined' && result){
          res = result.rows
        }
        else{
          console.log(err)
          res = err
        }
        resolve (res) ;
        })
    })
};

module.exports = {
  createNewLancamentoQuery,
  getLancamentoQuery,
  deleteNewLancamentoQuery
};
