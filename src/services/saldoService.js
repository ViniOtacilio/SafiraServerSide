const createNewSaldoQuery = require("../model/saldoQuery");
const changeSaldoQuery = require("../model/saldoQuery");
const getSaldoQuery = require("../model/saldoQuery");


const createNewSaldo = async (userid) => {
    let errors = [];

    if (!userid) {
        errors.push({ message: "Usuario não está logado" });
    }

    if (errors.length > 0) {
        throw errors;
    } else {
        createNewSaldoQuery.createNewSaldo(userid);
    }
};

const changeSaldoService = async (userid, tipo_de_transacao, value) => {
    let errors = [];

    if (!userid) {
        errors.push({ message: "Saldo nao encontrado" });
    }

    if (errors.length > 0) {
        throw errors;
    } else {
        changeSaldoQuery.changeSaldo(userid, tipo_de_transacao, value);
    }

}

const getSaldoService = async (user_id) => {
    let errors = [];
  

    if (!user_id) {
        errors.push({ message: "Saldo nao encontrado" });
    }

    if (errors.length > 0) {
        throw errors;
    } else {
        saldo = await getSaldoQuery.getSaldo(user_id);
        return saldo;
    }
}

module.exports = {
    createNewSaldo,
    changeSaldoService,
    getSaldoService
};
