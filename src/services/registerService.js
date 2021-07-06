const bcrypt = require("bcrypt");
const registerNewUserQuery = require("../model/registerUserQuery");

const createNewUser = async (name, email, password, Repeatedpassword) => {
  let errors = [];

    if (!name || !email || !password || !Repeatedpassword) {
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
    let hashedPassword = await bcrypt.hash(password, 10);
    // Criando usuário no banco
    registerNewUserQuery.registerNewUser(name, email, hashedPassword);
  }
};

module.exports = {
  createNewUser,
};
