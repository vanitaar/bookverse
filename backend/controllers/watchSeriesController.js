const {
  addToWatchSeriesDB,
  checkIsSeriesInWatchList,
  getWatchlistDB,
  removeSeriesFromWatchlistDB,
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

const removeSeriesFromWatchlist = async (req, res) => {
  try {
    const { seriesId } = req.params;
    const userId = req.user.id;

    const isSeriesInWatchlist = await checkIsSeriesInWatchList(
      userId,
      seriesId
    );
    if (!isSeriesInWatchlist) {
      return res.status(404).json({ error: "Series not found in watchlist" });
    }

    await removeSeriesFromWatchlistDB(userId, seriesId);

    res
      .status(200)
      .json({ message: "Series removed from watchlist successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addSeriesToWatch, getWatchlist, removeSeriesFromWatchlist };
