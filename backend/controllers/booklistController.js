// const pool = require("../config/db"); // refactor to model/Book.js
const { findBooksByAuthor, addToBooklist } = require("../models/Book");

const getAllBooksByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const books = await findBooksByAuthor(authorId);
    if (!books) {
      return res.status(404).json({ error: "No books found for this author" });
    }
    res.json(books);
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
    series_title,
    series_status,
    order_in_series,
  } = req.body;
  const authorId = req.user.id;

  try {
    const newBook = await addToBooklist({
      title,
      authorId,
      image_url,
      blurb,
      dedication,
      publication_date,
      format_ebook,
      format_physical,
      format_audio,
      series_title,
      series_status,
      order_in_series,
    });
    res.status(201).json(newBook);
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
