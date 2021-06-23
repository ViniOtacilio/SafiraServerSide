//const passport = require("../utils/passportConfig.js");
const express = require("express");
const app = express();
const passport = require("passport");
const initializePassport = require("../utils/passportConfig.js");
const session = require("express-session");

initializePassport(passport);

app.use(
    session({
        // Key we want to keep secret which will encrypt all of our information
        secret: process.env.SESSION_SECRET,
        // Should we resave our session variables if nothing has changes which we dont
        resave: false,
        // Save empty value if there is no vaue which we do not want to do
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
/*
app.post(
    '/login',
    passport.authenticate("local", { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    }
);


module.exports = {
    loginUser
}*/