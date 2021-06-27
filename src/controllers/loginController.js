//const passport = require("../utils/passportConfig.js");
const express = require("express");
const app = express();
const passport = require("passport");

app.post("/login",
    passport.authenticate("local", { 
        successRedirect: '/', 
        failureRedirect: '/login?fail=true' 
    })
)


app.get('/login',  (request, response ) => {
    return response.json({ message: "login" });
})
