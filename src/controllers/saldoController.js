const { createNewSaldo } = require('../services/saldoService');
const { changeSaldoService } = require('../services/saldoService');
const { getSaldoService } = require('../services/saldoService');


const createSaldo = async (userid) => {
   
    try {
        await createNewSaldo(userid);
    }
    catch (e) {
        console.log("Saldo nao criado: " + e);
    }
}

const changeSaldo = async (userid, tipo_de_transacao, value) => {
    try {
        await changeSaldoService(userid, tipo_de_transacao, value);
    }
    catch (e) {
        console.log("Saldo nao alterado: " + e);
    }

}

const getSaldo = async (req, res, next) => {

    let userid = req.user.user_id;

    try {
        saldoF = await getSaldoService(userid)
        console.log("controller:" + saldoF);
        res.send(saldoF);
        next();
    } 
    catch (e) {
        res.send({
            message: e
        });
        console.log("Saldo nao encontrado" + e);
    }
}

module.exports = {
    createSaldo,
    changeSaldo,
    getSaldo
}