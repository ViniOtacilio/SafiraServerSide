require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const app = express();
const routes = require("./routes/router");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (request, response) => {
  return response.json({ message: "Server is up" });
});

app.use("/api", routes);

app.listen(3333);

module.exports = {
  app
};
