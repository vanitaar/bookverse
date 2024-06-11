const pool = require("../config/db");

const findBooksByAuthor = async (authorId) => {
  const result = await pool.query("SELECT * FROM Books WHERE author_id = $1", [
    authorId,
  ]);
  return result.rows;
};

const addToBooklist = async ({
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
}) => {
  const query = `
      INSERT INTO Books 
      (title, author_id, image_url, blurb, dedication, publication_date, format_ebook, format_physical, format_audio, series_id, order_in_series) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING *`;

  const values = [
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
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { findBooksByAuthor, addToBooklist };
