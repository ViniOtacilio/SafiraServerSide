const { pool } = require("../database.js");

const registerNewUser = (name, email, hashedPassword) => {

    let errors = [];
  // Checa se há um usuário com o mesmo email
  pool.query(
    `SELECT * FROM users
        WHERE email = $1`,
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        errors.push({ message: "Email já existente" });
        throw errors;
      }
      // Se estiver tudo certo cria a conta do usuário
      else {
        pool.query(
          `INSERT INTO users (username, email, password, date_created)
               VALUES ($1, $2, $3, current_timestamp)
               RETURNING user_id, password`,
          [name, email, hashedPassword],
          (err, result) => {
            if (err) {
              throw err;
            }
          }
          );
      }
    }
  );
};

module.exports = {
  registerNewUser,
};
