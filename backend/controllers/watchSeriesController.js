const {
  addToWatchSeriesDB,
  checkIsSeriesInWatchList,
  getWatchlistDB,
} = require("../models/WatchSeries");

const addSeriesToWatch = async (req, res) => {
  try {
    const { userId, seriesId } = req.body;

    if (!userId || !seriesId) {
      return res
        .status(400)
        .json({ error: "User ID and Series ID are required" });
    }
    const alreadyInWatchList = await checkIsSeriesInWatchList(userId, seriesId);

    if (alreadyInWatchList) {
      return res.status(200).json({ message: "Series already in watch list" });
    }

    await addToWatchSeriesDB(userId, seriesId);

    res
      .status(201)
      .json({ message: "Series added to watch list successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWatchlist = async (req, res) => {
  try {
    const readerId = req.user.id;
    const watchlist = await getWatchlistDB(readerId);
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addSeriesToWatch, getWatchlist };
