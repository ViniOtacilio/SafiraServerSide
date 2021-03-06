require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const routes = require("./routes/router");
const cron = require('node-cron');
var cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./openApiDocumentation/openApiDocumentation');

const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./utils/passportConfig.js");
const FileStore = require('session-file-store')(session);
const { pool } = require("./database.js");

cors({ credentials: true, origin: true });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.json());

//Inicio LOGIN
initializePassport(passport);

app.use(
    session({
        store: new FileStore,
        secret: process.env.SESSION_SECRET ,
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
        return res.status(500).send({ success: false, error: { message: 'Houve um erro no login' } });
        //return res.sendStatus(500);
    }
      req.login(user, function (error) {
          if (error) return next(error);
          res.status(200).json({userId: req.user.user_id, userName: req.user.username});
          console.log(req.user);
        //   console.log(req.headers.cookie);
        //   console.log("Request Login supossedly successful " + req.isAuthenticated() + req.user.user_id + req.session.id);
      });
     // res.redirect("/")
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
//Fim LOGIN

app.use("/api", routes);

app.get("/", (req, res) => {
    return res.json({ message: "Server is up " + req.isAuthenticated()});
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));


//Lancamentos parcelados e recorrentes
cron.schedule('0 1 * * *', function () {
    var currentDate = new Date();
    var currentDay = currentDate.getUTCDate();
    console.log(currentDay);
    //Lancamentos parcelados
    pool.query(
        `UPDATE lancamentos SET qtd_parcelas=qtd_parcelas-1 WHERE parcelado = true AND qtd_parcelas > 1 AND dia_cobranca = $1`,
        [
            currentDay
        ],
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )

    pool.query(
        `INSERT INTO lancamentos (value,tipo_de_transacao,userid,categoriaid,titulo_lancamento,comentario) SELECT value,tipo_de_transacao,userid,categoriaid,titulo_lancamento,comentario FROM lancamentos WHERE parcelado = true AND qtd_parcelas > 1 AND dia_cobranca = $1`,
        [
            currentDay
        ],
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )
    //Lancamentos recorrentes
    pool.query(
        `INSERT INTO lancamentos (value,tipo_de_transacao,userid,categoriaid,titulo_lancamento,comentario) SELECT value,tipo_de_transacao,userid,categoriaid,titulo_lancamento,comentario FROM lancamentos WHERE repetido = true and dia_cobranca = $1`,
        [
            currentDay
        ],
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )
});



app.listen(3333);

module.exports = {
  app,
};
