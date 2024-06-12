const pool = require("../config/db");

const addToWatchSeriesDB = async (readerId, seriesId) => {
  const result = await pool.query(
    `INSERT INTO WatchSeries (reader_id, series_id) VALUES ($1, $2) RETURNING *`,
    [readerId, seriesId]
  );
  return result.rows[0];
};

const checkIsSeriesInWatchList = async (readerId, seriesId) => {
  const result = await pool.query(
    `SELECT * FROM WatchSeries WHERE reader_id = $1 AND series_id = $2`,
    [readerId, seriesId]
  );
  return result.rows.length > 0;
};

const getWatchlistDB = async (readerId) => {
  const result = await pool.query(
    `SELECT ws.*, s.series_title AS series_title, u.username AS author_username, s.status AS series_status, s.id AS series_id
     FROM WatchSeries ws
     JOIN Series s ON ws.series_id = s.id
     JOIN Users u ON s.author_id = u.id
     WHERE ws.reader_id = $1`,
    [readerId]
  );
  return result.rows;
};

module.exports = {
  addToWatchSeriesDB,
  checkIsSeriesInWatchList,
  getWatchlistDB,
};
