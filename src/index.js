require("dotenv").config({ path: __dirname + "/.env" });
const passport = require("passport");
const express = require("express");
const routes = require("./routes/router");
const session = require("express-session");
const indexRouter = require('./routes/home');

function authenticationMiddleware(request, response, next) {
    if (request.isAuthenticated()) return next();
    response.redirect('/login?fail=true');
}
  
const app = express();

app.use(express.json());

/*
app.get('/', authenticationMiddleware, (request, response, next) => {
    response.json({ message: "Server is up" });
    console.log("conectado ao banco");
});
*/

app.use("/api", routes);

//LOGIN
require('./utils/passportConfig')(passport);
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

app.post(
    '/login',
    passport.authenticate("local", { 
        successRedirect: '/', 
        failureRedirect: '/login?fail=true' 
    })
);

app.get('/login',  (request, response ) => {
    return response.json({ message: "login" });
})
//LOGIN

app.use('/', authenticationMiddleware,  indexRouter);

app.listen(3333);

module.exports = {
  app
};