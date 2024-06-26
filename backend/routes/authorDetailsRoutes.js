const express = require("express");
const router = express.Router();
const pool = require("../config/db");
// /api/authors
router.get("/:authorUsername", async (req, res) => {
  console.log(req.params);
  const { authorUsername } = req.params;
  try {
    const query = `
    SELECT 
    u.id AS author_id, 
    u.username AS author_username, 
    u.email AS author_email, 
    u.role AS author_role, 
    b.id AS book_id, 
    b.title AS book_title, 
    b.image_url AS book_image_url, 
    b.blurb AS book_blurb, 
    b.publication_date AS book_publication_date, 
    b.format_ebook AS book_format_ebook, 
    b.format_physical AS book_format_physical, 
    b.format_audio AS book_format_audio, 
    s.status AS series_status,
    s.series_title AS series_title,
    s.id AS series_id,
    b.order_in_series AS book_order_in_series,
    su.id AS status_id, 
    su.status AS status_text, 
    su.created_at AS status_updated_at
  FROM Users u 
  LEFT JOIN Books b ON u.id = b.author_id 
  LEFT JOIN Series s ON b.series_id = s.id 
  LEFT JOIN StatusUpdates su ON u.id = su.author_id
  WHERE u.username = $1
  AND (su.archived = FALSE OR su.archived IS NULL);`;

    const { rows } = await pool.query(query, [authorUsername]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Author not found" });
    }

    const author = {
      id: rows[0].author_id,
      username: rows[0].author_username,
      email: rows[0].author_email,
      role: rows[0].author_role,
    };

    const books = rows
      .filter((row) => row.book_id !== null)
      .map((row) => ({
        id: row.book_id,
        title: row.book_title,
        image_url: row.book_image_url,
        blurb: row.book_blurb,
        publication_date: row.book_publication_date,
        format_ebook: row.book_format_ebook,
        format_physical: row.book_format_physical,
        format_audio: row.book_format_audio,
        series_id: row.series_id,
        series_status: row.series_status,
        series_title: row.series_title,
        order_in_series: row.book_order_in_series,
      }));

    const statusUpdates = rows
      .filter((row) => row.status_id !== null)
      .map((row) => ({
        id: row.status_id,
        status: row.status_text,
        created_at: row.status_updated_at,
      }));

    const completeSeries = books.filter(
      (book) => book.series_status === "complete"
    );
    const incompleteSeries = books.filter(
      (book) => book.series_status === "incomplete"
    );
    const standalones = books.filter((book) => !book.series_title);

    res.json({
      author,
      completeSeries,
      incompleteSeries,
      standalones,
      statusUpdates,
    });
  } catch (error) {
    console.error("Error fetching author details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//   try {
//     // Query to fetch author details, books, and status updates using join
//     const query = `
//             SELECT
//                 u.id AS author_id,
//                 u.username AS author_username,
//                 u.email AS author_email,
//                 u.role AS author_role,
//                 b.id AS book_id,
//                 b.title AS book_title,
//                 b.image_url AS book_image_url,
//                 b.blurb AS book_blurb,
//                 b.publication_date AS book_publication_date,
//                 b.format_ebook AS book_format_ebook,
//                 b.format_physical AS book_format_physical,
//                 b.format_audio AS book_format_audio,
//                 s.id AS status_id,
//                 s.status AS status_text,
//                 s.created_at AS status_updated_at
//             FROM Users u
//             LEFT JOIN Books b ON u.id = b.author_id
//             LEFT JOIN StatusUpdates s ON u.id = s.author_id
//             WHERE u.username = $1
//             AND s.archived = FALSE;`; // archived status updates are marked as archived = TRUE

//     const { rows } = await pool.query(query, [authorUsername]);
//     res.json(rows); // Send the fetched data back to the frontend
//   } catch (error) {
//     console.error("Error fetching author details:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;
