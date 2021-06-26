require("dotenv").config({ path: __dirname + "/.env" });
const passport = require("passport");
const express = require("express");
const app = express();
const routes = require("./routes/router");
const session = require("express-session");
const initializePassport = require("./utils/passportConfig.js");


app.use(express.json());


app.get("/", (request, response) => {
    return response.json({ message: "Server is up"});
   
});

app.use("/api", routes);

//LOGIN
initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.post('/users/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err) }
        if (!user) { return res.json({ message: info.message }) }
        res.json({ message: "Usuario logado:" + user.username });
    })(req, res, next);
});
//LOGIN


app.listen(3333);

module.exports = {
  app
};
