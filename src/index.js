require("dotenv").config({ path: __dirname + "/.env" });

const express = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('./database.js');
const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Server is up" });
});

app.post("/users/register", async (request, response) => {

  console.log(request.body);

  let { name, email, password, passwordRepeated } = request.body;

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

});

app.listen(3333);
