const { pool } = require("../database.js");

const getUser = async (email) => {
    return new Promise(function (resolve, reject) {

        pool.query(
            `SELECT * FROM users
             WHERE email = $1
            `,
            [email],
            (error, results) => {
                if (results.rows.length < 1) {
                    console.log("Email não encontrado");
                    return null;
                }
                else {
                    console.log(results.rows[0]);
                    resolve(results.rows[0]);
                    //return results.rows[0];
                }
            }
        );
    })
}

const getUserIdByToken = async (token) => {
    return new Promise(function (resolve, reject) {

        pool.query(
            `SELECT * FROM users
             WHERE reset_token = $1
            `,
            [token],
            (error, results) => {
                if (results.rows.length < 1) {
                    console.log("Usuario não encontrado");
                    return null;
                }
                else {
                    console.log(results.rows[0]);
                    resolve(results.rows[0]);
                }
            }
        );
    })
}


module.exports = {
    getUser,
    getUserIdByToken
};
