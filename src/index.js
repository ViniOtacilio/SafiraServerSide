require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/router");
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  return response.json({ message: "Server is up" });
});

app.use("/api", routes);


app.listen(3333);

module.exports = {
  app
};
