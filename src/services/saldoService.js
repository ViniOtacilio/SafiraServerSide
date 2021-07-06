const createNewSaldoQuery = require("../model/saldoQuery");
const changeSaldoQuery = require("../model/saldoQuery");

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
module.exports = {
    createNewSaldo,
    changeSaldoService
};
