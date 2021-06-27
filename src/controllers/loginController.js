<<<<<<< HEAD
=======
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
>>>>>>> 8ade4bf53fccc2416bb36a6202b886525d755b12
