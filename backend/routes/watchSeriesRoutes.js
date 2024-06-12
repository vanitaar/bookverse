const express = require("express");
const passport = require("passport");
const {
  addSeriesToWatch,
  getWatchlist,
} = require("../controllers/watchSeriesController");

const router = express.Router();
// /api/readers/watchseries
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  addSeriesToWatch
);

router.get("/", passport.authenticate("jwt", { session: false }), getWatchlist);

module.exports = router;
