const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const gamesController = require("./controllers/gamesController");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/games", gamesController);

app.get("/", (req, res) => {
  res.send("old vg db");
});

app.get("*", (req, res) => {
  res.send("Page not found");
});

module.exports = app;
