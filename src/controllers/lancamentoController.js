const { createNewLancamento } = require('../services/lancamentoService'); 


const createLancamento = async (req, res, next) => {

    //console.log("Dentro da funcao de lancamento:" + req.user.user_id);

    const { value, tipo_de_transacao, categoriaid, titulo_lancamento, data_lancamento } = req.body;
    const userid = req.user.user_id;

    try {
        await createNewLancamento(value, tipo_de_transacao, userid, categoriaid, titulo_lancamento, data_lancamento);
        res.sendStatus(201);
        next();
    }
    catch (e) {
        res.sendStatus(500);
    }
}

module.exports = {
    createLancamento
}