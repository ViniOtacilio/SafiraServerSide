const { pool } = require('../database.js');
const bcrypt = require('bcrypt');

const createNewUser = async (name, email, password, passwordRepeated) => {

    let errors = [];
  
    if (!name || !email || !password || !passwordRepeated) {
      errors.push({ message: "Por favor preencha todos os campos!" });
    }
  
    if (password.length < 6) {
      errors.push({ message: "Sua senha deve ser maior que 6 caracteres." });
    }
  
    if (password != passwordRepeated) {
      errors.push({ message: "A senha repetida está incorreta." });
    }
  
    if (errors.length > 0) {
      throw errors;
    } else {
      let hashedPassword = await bcrypt.hash(password,10);
      

      // Checa se há um usuário com o mesmo email
      pool.query(
        `SELECT * FROM users
        WHERE email = $1`,[email], (error,results) => {
          if(error){
            throw error;
          }
          if(results.rows.length > 0) {
            errors.push({message: "Email já existente"});
            throw errors;
          }
          // Se estiver tudo certo cria a conta do usuário
          else {
            pool.query(
              `INSERT INTO users (username, email, password, date_created)
               VALUES ($1, $2, $3, current_timestamp)
               RETURNING user_id, password`, [name, email, hashedPassword], (err, result) => {
                if (err) {
                  throw err
                }
               }
            )
          }


        }
      )
    }
}

module.exports = {
    createNewUser
}