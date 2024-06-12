const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// /api/books
// Search books by title, author, or dedication //using ILIKE //using join because User and Books
router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const searchQuery = `
        SELECT 
          Books.*,
          Users.username AS author
        FROM 
          Books
        JOIN 
          Users ON Books.author_id = Users.id
        WHERE 
          Books.title ILIKE $1
          OR Users.username ILIKE $1
          OR Books.dedication ILIKE $1
      `;
    const values = [`%${query}%`];
    const result = await pool.query(searchQuery, values);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
