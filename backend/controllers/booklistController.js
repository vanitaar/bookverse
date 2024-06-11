const pool = require("../config/db");

const getAllBooksByAuthor = async (req, res) => {
  const authorId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM Books WHERE author_id = $1",
      [authorId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBook = async (req, res) => {
  const {
    title,
    image_url,
    blurb,
    dedication,
    publication_date,
    format_ebook,
    format_physical,
    format_audio,
    series_id,
    order_in_series,
  } = req.body;
  const authorId = req.user.id;

  try {
    const result = await pool.query(
      "INSERT INTO Books (title, author_id, image_url, blurb, dedication, publication_date, format_ebook, format_physical, format_audio, series_id, order_in_series) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        title,
        authorId,
        image_url,
        blurb,
        dedication,
        publication_date,
        format_ebook,
        format_physical,
        format_audio,
        series_id,
        order_in_series,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//for search
// const getAllBooks = async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM Books");
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
  getAllBooksByAuthor,
  addBook,
  // getAllBooks
};
