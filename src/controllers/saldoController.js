const { createNewSaldo } = require('../services/saldoService');
const { changeSaldoService } = require('../services/saldoService');


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

module.exports = {
    createSaldo,
    changeSaldo
}