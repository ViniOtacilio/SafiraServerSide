//const passport = require("../utils/passportConfig.js");

const initializePassport = require("../utils/passportConfig.js");
const passport = require("passport");

initializePassport(passport);

const loginUser = passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
});

module.exports = {
    loginUser
}