const pool = require("../config/db");

const findBooksByAuthor = async (authorId) => {
  const result = await pool.query("SELECT * FROM Books WHERE author_id = $1", [
    authorId,
  ]);
  return result.rows;
};

const createOrUpdateSeries = async (title, status, authorId) => {
  const result = await pool.query(
    "INSERT INTO Series (title, status, author_id) VALUES ($1, $2, $3) ON CONFLICT (title, author_id) DO UPDATE SET status = $2 RETURNING id",
    [title, status, authorId]
  );
  return result.rows[0].id;
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
  series_title,
  series_status,
  order_in_series,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    let series_id = null;
    if (series_title) {
      series_id = await createOrUpdateSeries(
        series_title,
        series_status,
        authorId
      );
    }

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

    const result = await client.query(query, values);
    const newBook = result.rows[0];

    await client.query("COMMIT");
    return newBook;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

module.exports = { findBooksByAuthor, addToBooklist, createOrUpdateSeries };
