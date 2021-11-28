const { createNewSaldo } = require('../services/saldoService');
//const { changeSaldoService } = require('../services/saldoService');
const { getSaldoService } = require('../services/saldoService');


const createSaldo = async (userid) => {
   
    try {
        await createNewSaldo(userid);
    }
    catch (e) {
        console.log("Saldo nao criado: " + e);
    }
}

/*const changeSaldo = async (userid, tipo_de_transacao, value) => {
    try {
        await changeSaldoService(userid, tipo_de_transacao, value);
    }
    catch (e) {
        console.log("Saldo nao alterado: " + e);
    }

}*/

const getSaldo = async (req, res, next) => {

    const user_id = req.query.user_id;

    try {
        saldoF = await getSaldoService(user_id)
        res.send(saldoF);
        next();
    } 
    catch (e) {
        return res.status(500).send({ success: false, error: { message: e } });
        console.log("Saldo nao encontrado" + e);
    }
}

module.exports = {
    createSaldo,
    getSaldo
}