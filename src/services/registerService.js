const { pool } = require('../database.js');
const bcrypt = require('bcrypt');

const createNewUser = async (name, email, password, passwordRepeated) => {

    let errors = [];
  
    if (!name || !email || !password || !passwordRepeated) {
      errors.push({ message: "Por favor preencha todos os campos!" });
    }
  
    if (password.length < 6) {
      errors.push({ message: "Sua senha deve ter mais do que 6 números." });
    }
  
    if (password != passwordRepeated) {
      errors.push({ message: "A senha repetida está incorreta." });
    }
  
    if (errors.length > 0) {
      return response.json({errors});
    } else {
      let hashedPassword = await bcrypt.hash(password,10);
      
      pool.query(
        `SELECT * FROM users
        WHERE email = $1`,[email], (error,results) => {
          if(error){
            throw error;
          }
          console.log('reach here');
          console.log(results.rows);
        }
      )
    }
}

module.exports = {
    createNewUser
}