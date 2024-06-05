const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

// /api/auth
router.post("/register", registerUser);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUser,
);
router.post("/logout", logoutUser);

module.exports = router;
