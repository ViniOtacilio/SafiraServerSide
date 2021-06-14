const { registerService } = require('../services/registerService');

const { createNewUser } = registerService;


const createUser = async (req, res, next) => {
    const { name, email, password, passwordRepeated } = request.body;

    try {
        await createNewUser(name, email, password, passwordRepeated);
        res.sendStatus(201);
        next();
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = {
  createUser
}