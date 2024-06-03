const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const debug = require("debug")("BookVerse:server");

const app = express();

require("dotenv").config(); //access secret url from env var
require("./config/db"); //connect to database

app.use(logger("dev"));
app.use(express.json()); //built-in middleware (json data --> req.body)
app.use(express.urlencoded({ extended: true })); //built-in middleware
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "/dist")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//start server (entry point)
const port = process.env.PORT || 3000;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
