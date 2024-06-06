const pool = require("../config/db");

const createUser = async (username, email, password_hashed, role) => {
  const result = await pool.query(
    `INSERT INTO users (username, email, password_hashed, role) VALUES ($1, $2, $3, $4) RETURNING *`,
    [username, email, password_hashed, role],
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  findUserByEmail,
};
