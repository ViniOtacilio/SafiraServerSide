const { getLancamentoByUser } = require('../services/getLancamentoService'); 


const getLancamento = async (req, res, next) => {

    const user_id = req.query.user_id;
    const lanc_id = req.query.id;
    const lanc_status = req.query.status;
    const lanc_date = req.query.date;
    const lanc_category = req.query.category;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    console.log("Dentro do Controller de getlancamento:" + user_id + "-" + lanc_id + "-" + lanc_status +  "-" + lanc_category + "-" + start_date + "-" + end_date);

    try {
        await getLancamentoByUser(user_id, lanc_id, lanc_status, lanc_category, start_date, end_date);
        res.sendStatus(201);
        next();
    }
    catch (e) {
        console.log(e)
        res.send({
            message:e
         });
    }
}

module.exports = {
    getLancamento
}