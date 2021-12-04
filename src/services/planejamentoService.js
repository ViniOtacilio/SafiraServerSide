const planejamentoQuery = require("../model/planejamentoQuery");

const createNewPlanejamento = async (user_id, mes, categoria_id, value) => {
    await planejamentoQuery.createNewPlanejamentoQuery(user_id, mes, categoria_id, value);
}

const deleteNewPlanejamento = async (user_id, mes, categoria_id) => {

    if (user_id == null || mes == null || categoria_id == null) {
        throw "Dados insuficientes";
    }
    planejamentoQuery.deleteNewPlanejamentoQuery(user_id, mes, categoria_id);

}

const getPlanejamentoMensal = async (query) => {
    console.log("Dentro do service de getPlanejamentoMensal: " + query );

    data = await planejamentoQuery.getPlanejamentoQuery( query );
    
    console.log('outside return func : ');
    console.log(data);

    return data;
  
}    

module.exports = {
    createNewPlanejamento,
    deleteNewPlanejamento,
    getPlanejamentoMensal
};
