const { createNewPlanejamento } = require('../services/planejamentoService');
const { deleteNewPlanejamento } = require('../services/planejamentoService');
const { getPlanejamentoMensal } = require('../services/planejamentoService');

const createPlanejamento = async (req, res, next) => {
    const plans = req.body;
    months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    for (let plan of plans) {
        
      
        if (plan.user_id == null || plan.mes == null || plan.categoria_id == null || plan.value == null) {
            return res.status(500).send({ success: false, error: { message: 'Dados insuficientes para a criação do planejamento' }});
        }

        if (months.indexOf(plan.mes.split('-')[0]) == -1) {
            return res.status(500).send({ success: false, error: { message: 'mês inválido' }});
        }

        if(plan.mes.split('-')[1]){
            if(plan.mes.split('-')[1].length != 4){
                console.log(plan.mes.split('-')[1])
                console.log(plan.mes.split('-')[1].length)
            return res.status(500).send({ success: false, error: { message: 'ano inválido' }});
            }
        }
        else {
            return res.status(500).send({ success: false, error: { message: 'mes inválido, não contém o ano' }});
        }

        try {
            await createNewPlanejamento(plan.user_id, plan.mes, plan.categoria_id, plan.value);
        }
        catch (e) {
            console.log("ERRO: "+ e);
            return res.status(500).send({ success: false, error: { message: e } });
        }

    }
    
    return res.status(201)

}

const deletePlanejamento = async (req, res, next) => {

    const plan = req.body;
    console.log('entrou delete' + plan.user_id);
    try {
        await deleteNewPlanejamento(plan.user_id, plan.mes, plan.categoria_id);
        res.status(200).send({ message: "Planejamento deletado"});
        next();
    }
    catch (e) {
        console.log("ERRO: " + e);
        return res.status(500).send({ success: false, error: { message: e } });
    }
}

const getPlanejamento = async (req, res, next) => {
    months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

    const user_id = req.query.user_id;
    const mes = req.query.mes;

    console.log('controller: ' + user_id + ' | ' + mes)

    if (!user_id) {
        return res.status(500).send({ success: false, error: { message: 'sem id de usuário' }});
    }
    if(!mes){
        return res.status(500).send({ success: false, error: { message: 'sem mes' }});
    }
    if(months.indexOf(mes.split('-')[0]) == -1){
        return res.status(500).send({ success: false, error: { message: 'mês inválido' }});
    }

    if(mes.split('-')[1]){
        if(mes.split('-')[1].length != 4){
            console.log(mes.split('-')[1])
            console.log(mes.split('-')[1].length)
        return res.status(500).send({ success: false, error: { message: 'ano inválido' }});
        }
    }
    else{
        return res.status(500).send({ success: false, error: { message: 'mes inválido, não contém o ano' }});
    }

    var base_query = `WITH lancamentos_do_mes AS(
        SELECT sum(l.value) as values, c.nome AS nome_categoria, c.id AS id_categoria, date_trunc('month', l.data_lancamento) AS mes, l.userid
        FROM lancamentos AS l
            LEFT JOIN categoria AS c
                ON l.categoriaid = c.id
                WHERE userid = `+ user_id +`
                AND date_trunc('month', data_lancamento) = to_date('`+mes+`', 'MM-YYYY') GROUP BY c.nome, c.id, date_trunc('month', l.data_lancamento), l.userid)
    
    SELECT  lm.userid, sum(lm.values) AS valor_gasto, lm.nome_categoria, lm.id_categoria, lm.mes, sum(pm.value) AS valor_planejado
        FROM lancamentos_do_mes lm
            LEFT JOIN planejamento pm
                ON ((lm.userid = pm.user_id) AND (lm.id_categoria = pm.categoria_id) AND (lm.mes = to_date(pm.mes, 'MM-YYYY')))
                GROUP BY lm.id_categoria, lm.userid, lm.nome_categoria, pm.mes, pm.categoria_id, lm.mes`

    console.log('controller: ' + base_query)

    try {
        result = await getPlanejamentoMensal(base_query);
        console.log(result);
        res.send(result);
        next();
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: e } });
    }
}

module.exports = {
    createPlanejamento,
    deletePlanejamento,
    getPlanejamento
}