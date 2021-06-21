const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("../database.js");
const bcrypt = require("bcrypt");

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    pool.query(
      `SELECT * FROM users WHERE email= $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "A senha não está correta" });
            }
          });
        }
        else {
            return done(null, false, { message: "Usuário não encntrado" });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );

  passport.serializeuser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
      pool.query(
          ` SELECT * FROM users where ID = $1 `, [id], (err, result) => {
              if (err) {
                  throw err;
              }
              return done(null, results.rows[0])
          }
      )
  })
}

module.exports = initialize;