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

export const deleteFromWatchlist = async (seriesId: number): Promise<void> => {
  const response = await fetch(`/api/readers/watchseries/${seriesId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete item from watchlist");
  }
};
