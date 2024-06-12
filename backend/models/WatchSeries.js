const pool = require("../config/db");

const addToWatchSeriesDB = async (userId, seriesId) => {
  const result = await pool.query(
    `INSERT INTO WatchSeries (reader_id, series_id) VALUES ($1, $2) RETURNING *`,
    [userId, seriesId]
  );
  return result.rows[0];
};

module.exports = { addToWatchSeriesDB };
