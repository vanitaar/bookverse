const { addToWatchSeriesDB } = require("../models/WatchSeries");

const addSeriesToWatch = async (req, res) => {
  try {
    const { userId, seriesId } = req.body;

    if (!userId || !seriesId) {
      return res
        .status(400)
        .json({ error: "User ID and Series ID are required" });
    }

    await addToWatchSeriesDB(userId, seriesId);

    res
      .status(201)
      .json({ message: "Series added to watch list successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addSeriesToWatch };
