
const { createNewUser } = require('../services/registerService');
require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
var cors = require("cors");

const passport = require("passport");
const session = require("express-session");
const initializePassport = require("../utils/passportConfig.js");
const FileStore = require('session-file-store')(session);

cors({ credentials: true, origin: true });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.json());
const cookieParser = require('cookie-parser');
const { createSaldo } = require('./saldoController');
app.use(cookieParser());

initializePassport(passport);

app.use(
    session({
        store: new FileStore,
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());


const createUser =  (req, res, next) => {
    const { name, email, password, passwordRepeated } = req.body;

    try {
        createNewUser(name, email, password, passwordRepeated);
        setTimeout(function () {
            passport.authenticate("local", function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    console.log(user);
                    return res.sendStatus(500);
                }
                req.login(user, function (error) {
                    if (error) return next(error);
                    console.log("Request Login supossedly successful " + req.isAuthenticated() + req.user.user_id);
                });
                res.redirect('/');
                createSaldo(req.user.user_id);
            })(req, res, next);
        }, 3000);
        
    }
    catch(e) {
        res.sendStatus(500);
    }
}

module.exports = {
    createUser
}