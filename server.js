const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./app/routes");

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`app is listening on port ${port}!`);
});

const dbURL =
  process.env.NODE_ENV === "test"
    ? process.env.MONGOHQ_TEST_URL
    : process.env.MONGOHQ_URL;

mongoose.connect(dbURL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.get("/", (req, res) => {
  res.status(404).send({ message: "Welcome to pouplation management system" });
});

routes(app);

app.all("*", (req, res) => {
  res.status(404).send({ message: "route not found" });
});

module.exports = app;
