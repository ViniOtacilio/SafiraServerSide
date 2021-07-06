const registerNewLancamentoQuery = require("../model/lancamentoUserQuery");
const { changeSaldo } = require("../controllers/saldoController");

const createNewLancamento = async (
  value,
  tipo_de_transacao,
  userid,
  categoriaid,
  titulo_lancamento,
  data_lancamento
) => {
  let errors = [];

  if (!value || !tipo_de_transacao || !categoriaid || !titulo_lancamento) {
    errors.push({ message: "Por favor preencha todos os campos obrigatórios!" });
  }

  if (errors.length > 0) {
    throw errors;
  } else {
    //Criando novo lançamento no banco de dados
    registerNewLancamentoQuery.createNewLancamentoQuery(
      value,
      tipo_de_transacao,
      userid,
      categoriaid,
      titulo_lancamento,
      data_lancamento
      );

      console.log("lancamento criado");

      changeSaldo(userid, tipo_de_transacao, value);

      console.log("saiu do change saldo");
  }
};

module.exports = {
  createNewLancamento,
};
