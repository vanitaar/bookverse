const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(logger("dev"));
app.use(express.json()); //built-in middleware (json data --> req.body)
app.use(express.urlencoded({ extended: true })); //built-in middleware
app.use(cors());

app.use(express.static(path.join(__dirname, "/dist")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//start server (entry point)
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
