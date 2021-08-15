const { createNewLancamento } = require('../services/lancamentoService'); 
const { getLancamentoByUser } = require('../services/lancamentoService'); 

const createLancamento = async (req, res, next) => {

    const { value, tipo_de_transacao, user_id, categoriaid, titulo_lancamento, comentario } = req.body;

    try {
        await createNewLancamento(value, tipo_de_transacao, user_id, categoriaid, titulo_lancamento, comentario);
        res.sendStatus(201);
        next();
    }
    catch (e) {
        res.sendStatus(500);
    }
};

const getLancamento = async (req, res, next) => {

    const user_id = req.query.user_id;
    const id = req.query.id;
    const categoria_id = req.query.categorias;
    const status = req.query.status;
    const titulo = req.query.titulo;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    console.log("Dentro do Controller de getlancamento:" + user_id + "-" + id + "-" + status +  "-" + titulo + "-" + start_date + "-" + end_date + "-" + categoria_id);

    try {
        result = await getLancamentoByUser( user_id, id, status, titulo, start_date, end_date, categoria_id)
        console.log('controller:');
        console.log(result);
        res.send(result);
        next();
    }
    catch (e) { 
        console.log(e)
        res.send({
            message:e
         });
    }
};

module.exports = {
    createLancamento,
    getLancamento
}