const registerNewLancamentoQuery = require("../model/lancamentoUserQuery");
const { getLancamentoQuery } = require('../model/lancamentoUserQuery');
const { changeSaldo } = require("../controllers/saldoController");

const createNewLancamento = async (
  value,
  tipo_de_transacao,
  userid,
  categoriaid,
  titulo_lancamento,
  comentario

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
      comentario
      );

      console.log("lancamento criado");

      changeSaldo(userid, tipo_de_transacao, value);
  }
};

const getLancamentoByUser = async (user_id, id, status, titulo, start_date, end_date) => {
   
  console.log("Dentro do service de getlancamento:" + user_id + "-" + id + "-" + status + "-" + titulo + "-" + start_date + "-" + end_date);

  let errors = [];

  var base_query = 'SELECT * FROM lancamentos WHERE userid IN ('+user_id+')';
  console.log(base_query);

  if (!user_id) {
      errors.push( "Sem id de usuário" );
  }

  if (errors.length > 0) {
      throw errors;
  } else {
      if (typeof id !== 'undefined' && id){
          base_query = base_query + ' AND id IN ('+id+')';
          console.log(base_query);
      } 
      if (typeof status !== 'undefined' && status ){
          if(status!='0' && status!='1' && status != '0,1'){
              errors.push({ message: "Tipo de  Transação inválido" });
              throw errors;
          }
          let values = [];
          value = status.split(',');
          for(idx in value){
              str = "'"+value[idx]+"'";
              console.log(str);
              values.push(str);
          }
          base_query = base_query + " AND tipo_de_transacao IN ("+values+")";
          console.log(base_query);
      }
      if (typeof start_date !== 'undefined' && start_date){
          if(start_date.split('-').length != 3){
              errors.push({ message: "Formato Inválido para data inicial" });
              throw errors;
          }
          if(start_date.split('-')[0].length != 4){
              errors.push({ message: "Ano Inválido para data inicial" });
              throw errors;
          }
          if((start_date.split('-')[1].length != 2 ) || (start_date.split('-')[1] > 12) || (start_date.split('-')[1] == '00')){
              errors.push({ message: "Mês Inválido para data inicial" });
              throw errors;
          }
          if((start_date.split('-')[2].length != 2) || (start_date.split('-')[2] > 31)){
              errors.push({ message: "Dia Inválido para data inicial" });
              throw errors;
          }

          base_query = base_query + " AND date_trunc('day', data_lancamento) >= TO_DATE('"+start_date+"', 'YYYY-MM-DD')";
          console.log(base_query);
      }
      if (typeof end_date !== 'undefined' && end_date){
          if(end_date.split('-').length != 3){
              errors.push({ message: "Formato Inválido para data final" });
              throw errors;
          }
          if(end_date.split('-')[0].length != 4){
              errors.push({ message: "Ano Inválido para data final" });
              throw errors;
          }
          if((end_date.split('-')[1].length != 2 ) || (end_date.split('-')[1] > 12) || (end_date.split('-')[1] == '00')){
              errors.push({ message: "Mês Inválido para data final" });
              throw errors;
          }
          if((end_date.split('-')[2].length != 2) || (end_date.split('-')[2] > 31)){
              errors.push({ message: "Dia Inválido para data final" });
              throw errors;
          }

          base_query = base_query + " AND date_trunc('day', data_lancamento) <= TO_DATE('"+end_date+"', 'YYYY-MM-DD')";
          console.log(base_query);
      }
      if (typeof titulo !== 'undefined' && titulo){
          let titulos = [];
          value = titulo.split(',');
          for(idx in value){
              str = "'"+value[idx]+"'";
              console.log(str);
              titulos.push(str);
          }
          base_query = base_query + " AND titulo_lancamento IN ("+titulos.join(",")+")";
          console.log(base_query);
      }

      console.log('final query: '+ base_query);

      data = await getLancamentoQuery( base_query );
      console.log('outside return func : ');
      console.log(data);

      return data ;

  }    
};

module.exports = {
  createNewLancamento,
  getLancamentoByUser
};
