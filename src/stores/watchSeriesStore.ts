import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

interface WatchlistState {
  watchingSeriesIds: number[];
  addSeries: (seriesId: number) => void;
  removeSeries: (seriesId: number) => void;
  isWatching: (seriesId: number) => boolean;
}

const watchlistStore = createStore<WatchlistState>((set, get) => ({
  watchingSeriesIds: [],
  addSeries: (seriesId) =>
    set((state) => ({
      watchingSeriesIds: [...state.watchingSeriesIds, seriesId],
    })),
  removeSeries: (seriesId) =>
    set((state) => ({
      watchingSeriesIds: state.watchingSeriesIds.filter(
        (id) => id !== seriesId
      ),
    })),
  isWatching: (seriesId) => get().watchingSeriesIds.includes(seriesId),
}));

const useWatchlistStore = () => useStore(watchlistStore);

export default useWatchlistStore;
export { watchlistStore };
