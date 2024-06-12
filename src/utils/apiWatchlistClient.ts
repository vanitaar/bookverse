import { WatchlistSeries } from "../types/dataTypes";

export const fetchReaderWatchlist = async (): Promise<WatchlistSeries[]> => {
  const response = await fetch("/api/readers/watchseries", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch watchlist");
  }

  return response.json();
};
