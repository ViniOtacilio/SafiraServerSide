const registerNewLancamentoQuery = require("../model/lancamentoUserQuery");
const { getLancamentoQuery } = require('../model/lancamentoUserQuery');
//const { changeSaldo } = require("../controllers/saldoController");
const { deleteNewLancamentoQuery } = require('../model/lancamentoUserQuery');

const createNewLancamento = async (
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
  let errors = [];

    if (!value || !tipo_de_transacao || !userid) {
    errors.push({ message: "Por favor preencha todos os campos obrigatórios!" });
  }

  if (typeof is_repetitivo != 'undefined'){
        console.log(is_repetitivo)
        if (is_repetitivo != "false" && is_repetitivo != "true"){
            errors.push({ message: "Por favor preencha o campo de repetição com um valor válido 'false' ou 'true'!" });
        }
  }
  else{
        is_parcelado = 'false'
        console.log('in else ' + is_parcelado)
  }

  if (typeof is_parcelado != 'undefined'){
        console.log(is_parcelado)
        if (is_parcelado != 'false' && is_parcelado != 'true'){
            errors.push({ message: "Por favor preencha o campo de parcelamento com um valor válido 'false' ou 'true'!" });
        }
  }
  else{
        is_parcelado = 'false'
        console.log('in else ' + is_parcelado)
   }

   if (typeof qnd_parcelas != 'undefined'){
        console.log(qnd_parcelas)
        if (Number.isInteger(qnd_parcelas) != true){
            errors.push({ message: "Por favor preencha o campo de qnd_parcelas com um número válido"});
        }
        else{
            if (qnd_parcelas < 1) {
                errors.push({ message: "Por favor preencha o campo de qnd_parcelas com um valor válido"});
              }
        }
    }
    else{
        qnd_parcelas = 0
        console.log('in else ' + qnd_parcelas)
    }

    if (typeof dia_cobranca != 'undefined'){
        console.log(dia_cobranca)
        if (Number.isInteger(dia_cobranca) != true){
            errors.push({ message: "Por favor preencha o campo de dia_cobranca com um número válido"});
        }
        else{
            if (dia_cobranca < 1 || dia_cobranca > 31) {
                errors.push({ message: "Por favor preencha o campo de dia_cobranca com um dia válido"});
              }
        }
  }

  console.log('before query')

  if (errors.length > 0) {
    console.log('error')
    console.log(errors)
    throw errors;
  } else {
    //Criando novo lançamento no banco de dados
    registerNewLancamentoQuery.createNewLancamentoQuery(
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
      );

      console.log("lancamento criado");

      //changeSaldo(userid, tipo_de_transacao, value);
  }
};

const deleteNewLancamento = async (id) => {

    deleteNewLancamentoQuery(id);

}

const repeatAllLancamentos = async () => {
    console.log("entrou");
    repeateLancamentos();
    console.log("rodou");
}

const getLancamentoByUser = async (user_id, id, status, titulo, start_date, end_date, categoria_id) => {
   
  console.log("Dentro do service de getlancamento:" + user_id + "-" + id + "-" + status + "-" + titulo + "-" + start_date + "-" + end_date);

  let errors = [];

  var base_query = 'SELECT l.*, c.nome AS nome_categoria FROM lancamentos AS l LEFT JOIN categoria AS c ON l.categoriaid = c.id WHERE userid IN ('+user_id+')';
  console.log(base_query);

  if (!user_id) {
      errors.push( "Sem id de usuário" );
  }

  if (errors.length > 0) {
      throw errors;
  } else {
      if (typeof id !== 'undefined' && id){
          base_query = base_query + ' AND l.id IN ('+id+')';
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
      if (typeof categoria_id !== 'undefined' && categoria_id){
        let categorias = [];
        value = categoria_id.split(',');
        for(idx in value){
            console.log(value[idx])

            if (!isNaN(parseInt(value[idx]))){
                console.log('is int')
             }
             else{
                 console.log(parseInt(value[idx]));
                 errors.push({ message: "Id de categoria Inválido" });
                 throw errors;
             }

            str = "'"+value[idx]+"'";
            console.log(str);
            categorias.push(str);
        }
       
        base_query = base_query + " AND categoriaid IN ("+categorias.join(",")+")";
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
  getLancamentoByUser,
  deleteNewLancamento,
  repeatAllLancamentos
};
