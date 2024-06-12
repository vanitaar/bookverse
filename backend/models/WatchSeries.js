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

module.exports = { addToWatchSeriesDB, checkIsSeriesInWatchList };
