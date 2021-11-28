const passport = require("passport");
const { createSaldo } = require('./saldoController');
const { createNewUser } = require('../services/registerService');

const createUser =  (req, res, next) => {
    // #swagger.start
    
     /*
         #swagger.path = '/forcedEndpoint/{id}'
         #swagger.method = 'put'
         #swagger.description = 'Forced endpoint.'
         #swagger.produces = ['application/json']
     */
     
     /*  #swagger.parameters['id'] = {
             in: 'path',
             type: 'integer',
             description: 'User ID.' } */
    // #swagger.end
    const { name, email, password, repeatedPassword } = req.body;
    let loginUser =  setTimeout(function () {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.sendStatus(500);
            }
            req.login(user, function (error) {
                if (error) return next(error);
                res.status(200).json({userId: req.user.user_id, userName: req.user.username});
                console.log(req.user);

            });
            createSaldo(req.user.user_id);
        })(req, res, next);
    }, 5000);

    try {
        console.log(name,email,password,repeatedPassword);
        // createNewUser(name, email, password, repeatedPassword).then(loginUser);
        createNewUser(name, email, password, repeatedPassword).then(loginUser);

    }
    catch(e) {
        return res.status(500).send({ success: false, error: { message: 'Nao foi possivel criar o novo usuario' } });
    }
}

module.exports = {
    createUser
}