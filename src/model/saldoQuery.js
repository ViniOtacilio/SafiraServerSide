const { pool } = require("../database.js");

const createNewSaldo = (userid) => {
    pool.query(
        `INSERT INTO saldo (value, userid)
         VALUES (0, $1)
         RETURNING id`,
        [userid],
        (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }
            else {
                console.log("Saldo criado, id: " + result.rows[0].id);
            }
        }
    );
};

const changeSaldo = (userid, tipo_de_transacao, value) => {

    if (tipo_de_transacao == 1) {
        pool.query(`
        UPDATE saldo
        SET value = value + $2
        WHERE userid = $1
        RETURNING value`,
            [userid, value],
            (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                else {
                    console.log("Novo saldo: " + result.rows[0].value);
                }
            }
        )
    } else if (tipo_de_transacao == 2) {
        pool.query(`
        UPDATE saldo
        SET value = value - $2
        WHERE userid = $1
        RETURNING value`,
            [userid, value],
            (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                else {
                    console.log("Novo saldo: " + result.rows[0].value);
                }
            }
        )

    }
    
}

const getSaldo = (userid, callback) => {

    return new Promise(function (resolve, reject) {
    
        pool.query(
            `SELECT value FROM saldo 
            WHERE userid = $1`,
            [userid],
            (err, result) => {
            if (err) {
                throw (err);
            }
                console.log(result.rows[0]);
                resolve(result.rows);
        })

    })  

}

module.exports = {
    createNewSaldo,
    changeSaldo,
    getSaldo
};
