const { registerService } = require('../services/registerService');

const { createNewUser } = require('../services/registerService');


const createUser = async (req, res, next) => {
    const { name, email, password, passwordRepeated } = req.body;

    try {
        await createNewUser(name, email, password, passwordRepeated);
        res.sendStatus(201);
        next();
    }
    catch(e) {
        res.sendStatus(500);
    }
}

module.exports = {
    createUser
}