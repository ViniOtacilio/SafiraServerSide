require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const routes = require("./routes/router");
var cors = require("cors");

const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./utils/passportConfig.js");
const FileStore = require('session-file-store')(session);

cors({ credentials: true, origin: true });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.json());

//LOGIN
initializePassport(passport);

app.use(
    session({
        store: new FileStore,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.post("/users/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
    return res.sendStatus(500);
    }
      req.login(user, function (error) {
          if (error) return next(error);
          console.log("Request Login supossedly successful " + req.isAuthenticated() + req.user.user_id + req.session.id);
      });
      res.redirect("/")
  })(req, res, next);
});

app.get('/logout', function (req, res, next) {
    req.logout();
    req.session.destroy(function (err) {
        if (!err) {
            res.status(200).clearCookie('connect.sid', { path: '/' }).json({ status: "Success" });
            console.log(req.user);
        } else {
            // handle error case...
        }

    });
});

//LOGIN
app.use("/api", routes);

app.get("/", (req, res) => {
    return res.json({ message: "Server is up " + req.isAuthenticated()});
});

app.listen(3333);

module.exports = {
  app,
};
