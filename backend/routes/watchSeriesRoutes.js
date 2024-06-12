const express = require("express");
const passport = require("passport");
const { addSeriesToWatch } = require("../controllers/watchSeriesController");

const router = express.Router();
// /api/reader/watchseries
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  addSeriesToWatch
);

module.exports = router;
