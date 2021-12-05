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
  qtd_parcelas,
  dia_cobranca,
  card_id
) => {
    if (!value || !tipo_de_transacao || !userid) {
    throw "Por favor preencha todos os campos obrigatórios(value, tipo_de_transacao e userid)!"
    }

    if (typeof is_repetitivo == undefined){
        if (is_repetitivo != false && is_repetitivo != true){
            throw "Por favor preencha o campo de repetição com um valor válido 'false' ou 'true'!"
        }

        if (typeof dia_cobranca != 'undefined'){
            if (Number.isInteger(dia_cobranca) != true){
                throw "Por favor preencha o campo de dia_cobranca com um número válido"
            }
            else{
                if (dia_cobranca < 1 || dia_cobranca > 31) {
                    throw  "Por favor preencha o campo de dia_cobranca com um dia válido"
                    }
            }
        }else{
        throw "Para criar um lançamento repetitivo é necessário o dia da cobrança"
        }

    }

    if (typeof is_parcelado == undefined){
        if (is_parcelado != false && is_parcelado != true){
            throw "Por favor preencha o campo de parcelamento com um valor válido 'false' ou 'true'!"
        }

        if (typeof dia_cobranca != 'undefined'){
            if (Number.isInteger(dia_cobranca) != true){
                throw "Por favor preencha o campo de dia_cobranca com um número válido"
            }
            else{
                if (dia_cobranca < 1 || dia_cobranca > 31) {
                    throw "Por favor preencha o campo de dia_cobranca com um dia válido"
                    }
            }
        }else{
        throw "Para criar um lançamento parcelado é necessário o dia da cobrança"
        }

        if (typeof qtd_parcelas != 'undefined'){
        if (Number.isInteger(qtd_parcelas) != true){
            throw "Por favor preencha o campo de parcelas com um número válido"
        }
        else{
            if (qtd_parcelas < 1) {
                throw "Por favor preencha o campo de parcelas com um valor válido"
                }
        }
    }else{
        throw "Para criar um lançamento parcelado é necessário a quantidade de parcelas"
    }

    }

    //Criando novo lançamento no banco de dados
    return await registerNewLancamentoQuery.createNewLancamentoQuery(
    value,
    tipo_de_transacao,
    userid,
    categoriaid,
    titulo_lancamento,
    comentario,
    is_repetitivo,
    is_parcelado,
    qtd_parcelas,
    dia_cobranca,
    card_id
    );

    console.log("lancamento criado");

    //changeSaldo(userid, tipo_de_transacao, value);
};

const deleteNewLancamento = async (id) => {
    let errors = [];

    if (!id) {

        errors.push({ message: "Sem id" });
    }

    if (errors.length > 0) {
        console.log(errors)
        throw errors;
    }
    else {
        deleteNewLancamentoQuery(id);
    }
}

const repeatAllLancamentos = async () => {
    repeateLancamentos();
}

const getLancamentoByUser = async (user_id, id, status, titulo, start_date, end_date, categoria_id, card_id) => {

  let errors = [];

  var base_query = 'SELECT l.*, c.nome AS nome_categoria FROM lancamentos AS l LEFT JOIN categoria AS c ON l.categoriaid = c.id WHERE userid IN ('+user_id+')';

  if (!user_id) {
      errors.push( "Sem id de usuário" );
  }

  if (errors.length > 0) {
      throw errors;
  } else {



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

    }

    if (typeof card_id !== 'undefined' && card_id){
        if (typeof id !== 'undefined' && id){
            base_query = base_query + ' AND l.id IN ('+id+')';
        }
        if(card_id == 'null'){
            base_query = base_query + " AND card_id IS NULL";
            base_query = base_query + " OR (userid IN ("+user_id+") AND card_id IS NULL AND parcelado IS TRUE)"
            base_query = base_query + " OR (userid IN ("+user_id+") AND card_id IS NULL AND repetido IS TRUE)"
        }
        else{
            base_query = base_query + " AND card_id = "+ card_id;
            base_query = base_query + " OR (userid IN ("+user_id+") AND card_id = " + card_id + " AND parcelado IS TRUE)"
            base_query = base_query + " OR (userid IN ("+user_id+") AND card_id = " + card_id + " AND repetido IS TRUE)"
        }
    }else{
      if (typeof id !== 'undefined' && id){
          base_query = base_query + ' AND l.id IN ('+id+')';
      } else {
        base_query = base_query + " OR (userid IN ("+user_id+") AND parcelado IS TRUE)"
        base_query = base_query + " OR (userid IN ("+user_id+") AND repetido IS TRUE)"
      }
    }

    console.log(base_query)

    start_date = Date.parse(start_date)
    end_date = Date.parse(end_date)
    cur_date = new Date()

    new_data = []

    data = await getLancamentoQuery( base_query );

    total = 0

    for(i=0; i<data.length;i++){
        if(data[i].parcelado == true){
            const lancamento = JSON.parse(JSON.stringify(data[i]))

            var parcelas = lancamento.qtd_parcelas
            var data_lanc = new Date(Date.parse(lancamento.data_lancamento))
            var value = lancamento.value
            var dia_cobranca = lancamento.dia_cobranca

            valor_parcela = value/parcelas

            data[i].valor_parcela = valor_parcela.toFixed(2)

            first_parcela_day = new Date(data_lanc.setDate(dia_cobranca))

            if(first_parcela_day < data_lanc){
                console.log('primeira parcela menor que data_lan')
                first_parcela = first_parcela_day.setMonth(data_lanc.getMonth()+1)
            }
            else{
                first_parcela = first_parcela_day
            }

            parcela_atual =  cur_date.getMonth() - first_parcela.getMonth() +
            (12 * (cur_date.getFullYear() - first_parcela.getFullYear()))

            data[i].parcela_atual = parcela_atual

            last_parcela_date = first_parcela.setMonth(first_parcela.getMonth()+parcelas)


            if(Number.isNaN(start_date) == false && Number.isNaN(end_date) == false){

                if(last_parcela_date >= start_date && last_parcela_date <= end_date){
                    total = parseFloat(data[i].value) + total
                    new_data.push(data[i])
                }
            }
            else{
                if(Number.isNaN(start_date) == false){

                    if(last_parcela_date >= start_date){
                        total = parseFloat(data[i].value) + total
                        new_data.push(data[i])
                    }
                }
                if(Number.isNaN(end_date) == false){

                    if(last_parcela_date <= end_date){
                        total = parseFloat(data[i].value) + total
                        new_data.push(data[i])
                    }
                }
                if(Number.isNaN(start_date) == true && Number.isNaN(end_date) == true){
                    total = parseFloat(data[i].value) + total
                    new_data.push(data[i])
                }
            }
        }
        else{
            total = parseFloat(data[i].value) + total
            new_data.push(data[i])
        }
    }

    new_data.push({'total':total})

    return new_data;

    }
};

module.exports = {
  createNewLancamento,
  getLancamentoByUser,
  deleteNewLancamento,
  repeatAllLancamentos
};
