const { pool } = require("../database.js");

const createNewLancamentoQuery = async (
  value,
  tipo_de_transacao,
  userid,
  categoriaid,
  titulo_lancamento,
  data_lancamento
) => {
  pool.query(
    `INSERT INTO lancamentos (value, tipo_de_transacao, userid, categoriaid, titulo_lancamento, data_lancamento, data_ultima_alteracao)
         VALUES ($1, $2, $3, $4, $5, $6, current_timestamp)`,
    [
      value,
      tipo_de_transacao,
      userid,
      categoriaid,
      titulo_lancamento,
      data_lancamento,
    ],
    (err, result) => {
      if (err) {
        throw err;
      }
    }
  );
};

module.exports = {
  createNewLancamentoQuery,
};
