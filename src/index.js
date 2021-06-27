require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const app = express();
const routes = require("./routes/router");
var cors = require('cors');
cors({credentials: true, origin: true})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())



app.get("/", (request, response) => {
  return response.json({ message: "Server is up" });
});

app.use("/api", routes);

app.listen(3333);

module.exports = {
  app
};
