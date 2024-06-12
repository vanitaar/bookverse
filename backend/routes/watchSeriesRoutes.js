const express = require("express");
const passport = require("passport");
const {
  addSeriesToWatch,
  getWatchlist,
  removeSeriesFromWatchlist,
} = require("../controllers/watchSeriesController");

const router = express.Router();
// /api/readers/watchseries
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  addSeriesToWatch
);

router.get("/", passport.authenticate("jwt", { session: false }), getWatchlist);

router.delete(
  "/:seriesId",
  passport.authenticate("jwt", { session: false }),
  removeSeriesFromWatchlist
);

module.exports = router;
