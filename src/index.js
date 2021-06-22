require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const app = express();
const routes = require("./routes/router");
var passport = require('passport');
require('./utils/passportConfig');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (request, response) => {
  return response.json({ message: "Server is up" });
});

app.use("/api", routes);

app.listen(3333);

module.exports = {
  app
};
