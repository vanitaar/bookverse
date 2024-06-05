const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser } = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const password_hashed = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, password_hashed, role);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = (req, res) => {
  const user = req.user;
  const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ user });
};

const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out" });
};

module.exports = { registerUser, loginUser, logoutUser };
