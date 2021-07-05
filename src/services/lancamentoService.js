const registerNewLancamentoQuery = require("../model/lancamentoUserQuery");

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
    errors.push({ message: "Por favor preencha todos os campos!" });
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
  }
};

module.exports = {
  createNewLancamento,
};
