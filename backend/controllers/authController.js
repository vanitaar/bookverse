const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  createUser,
  findUserById,
  updateUserPassword,
} = require("../models/User");

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

const updatePassword = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const userId = req.user.id;
    console.log("User ID:", userId);
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Both current and new passwords are required" });
    }

    // Check if the current password matches
    const user = await findUserById(userId);
    console.log("User found:", user);
    if (!user || !user.password) {
      return res
        .status(400)
        .json({ error: "User not found or user password is missing" });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const newPasswordHashed = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await updateUserPassword(userId, newPasswordHashed);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, updatePassword };
