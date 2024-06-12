const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const debug = require("debug")("BookVerse:server");

const app = express();

require("dotenv").config(); //access secret url from env var
require("./config/db"); //connect to database
//setup db tables
require("./config/setupDbSchema");
// const setupDb = require("./config/setupDbSchema");
// setupDb();

const passport = require("./config/passport");
const cookieParser = require("cookie-parser");

app.use(logger("dev"));
app.use(express.json()); //built-in middleware (json data --> req.body)
app.use(express.urlencoded({ extended: true })); //built-in middleware
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(passport.initialize());

//proxy /api ===:3000
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api", require("./routes/booklistRoutes"));

app.use("/api/books", require("./routes/bookSearchRoutes"));

// app.use(express.static(path.join(__dirname, "/dist")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });
// Serve static files from the ROOT dist directory
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

//start server (entry point)
const port = process.env.PORT || 3000;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
