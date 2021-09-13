const getCategoriaQuery = require("../model/categoriasQuery");
const { getCategoriaByUserQuery } = require("../model/categoriasQuery");


const createNewCustomCategory = async (user_id, name) => {

    getCategoriaQuery.createNewCustomCategoryQuery(user_id, name);

}

const getCategories = async () => {
  let errors = [];

    // Retornando categorias
    getCategoriaQuery.getCategoriaQuery();

};


const getCategoriaByUser = async (user_id,  start_date, end_date) => {
   
  console.log("Dentro do service de getlancamento:" + user_id + "-" + start_date + "-" + end_date);

  let errors = [];

  var base_query = 'SELECT categoriaid FROM lancamentos WHERE userid IN ('+user_id+')';
  console.log(base_query);

  if (!user_id) {
      errors.push( "Sem id de usuário" );
  }

  if (errors.length > 0) {
      throw errors;
  } else {
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

      console.log('final query: '+ base_query);

      data = await getCategoriaByUserQuery(base_query);
      console.log('outside return func : ');
      console.log(data);

      return data ;

  }    
};

module.exports = {
    getCategories,
    getCategoriaByUser,
    createNewCustomCategory
};
