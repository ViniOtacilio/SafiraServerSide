require("dotenv").config({ path: __dirname + "/.env" });
const passport = require("passport");
const express = require("express");
const app = express();
const routes = require("./routes/router");
const session = require("express-session");

app.use(express.json());


app.get("/", (request, response) => {
    return response.json({ message: "Server is up" });
    console.log("conectado ao banco");
});

app.use("/api", routes);

//LOGIN
app.use(passport.initialize());
app.use(passport.session());

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

app.post(
    '/login',
    passport.authenticate("local"),
    function (req, res) {
        res.redirect('/');
    }
);
//LOGIN

app.listen(3333);

module.exports = {
  app
};
