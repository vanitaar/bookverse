const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// /api/books
// Search books by title, author, or dedication //using ILIKE
router.get("/search", async (req, res) => {
  const { query } = req.query;
  console.log(req.query);
  try {
    const result = await pool.query(
      `SELECT b.id, b.title, u.name AS author, b.dedication 
       FROM Books b 
       JOIN Users u ON b.author_id = u.id 
       WHERE b.title ILIKE $1 OR u.name ILIKE $1 OR b.dedication ILIKE $1`,
      [`%${query}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
