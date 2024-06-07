const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
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

router.post(
  "/update-password",
  passport.authenticate("jwt", { session: false }),
  updatePassword,
);

module.exports = router;
