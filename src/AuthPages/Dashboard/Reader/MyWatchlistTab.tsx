import React, { useEffect } from "react";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  deleteFromWatchlist,
  fetchReaderWatchlist,
} from "../../../utils/apiWatchlistClient";
import { WatchlistSeries } from "../../../types/dataTypes";
import useWatchlistStore from "../../../stores/watchSeriesStore";
import useAuthStore from "../../../stores/authStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import queryClient from "../../../utils/apiQueryClient";

const MyWatchlistTab: React.FC = () => {
  const { setWatchlist } = useWatchlistStore();
  const { user } = useAuthStore();

  const { data, isLoading, error } = useQuery<WatchlistSeries[], Error>({
    queryKey: ["readerWatchlist"],
    queryFn: fetchReaderWatchlist,
  });

  const mutation = useMutation<void, Error, number>({
    mutationFn: (seriesId: number) => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      return deleteFromWatchlist(seriesId);
    },
    onSuccess: () => {
      toast.success("Series removed from watchlist successfully!");
      if (user) {
        queryClient.invalidateQueries([
          "readerWatchlist",
        ] as unknown as InvalidateQueryFilters);
      }
    },
    onError: (error: Error) => {
      toast.error(`Error removing series from watchlist: ${error.message}`);
    },
  });

  useEffect(() => {
    if (user?.role !== "reader") {
      // Handle the case where the user is not a reader
      console.error("User is not authorized to view the watchlist.");
      return;
    }

    if (!isLoading && !error && data) {
      const seriesIds = data.map((series) => series.series_id);
      setWatchlist(seriesIds);
    }
  }, [data, isLoading, error, setWatchlist, user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const clickDeleteFromWatchlist = (seriesId: number) => {
    mutation.mutate(seriesId);
    console.log(seriesId);
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-lime-600">
        My Watchlist
      </h2>
      <ul>
        {data?.map((series) => (
          <li key={series.id} className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-slate-400">
                  {series.series_title}
                </h3>
                {/* Link to the author's page */}
                <p>
                  Author:{" "}
                  <Link to={`/author/${series.author_username}`}>
                    {series.author_username}
                  </Link>
                </p>
                <p>Status: {series.series_status}</p>
              </div>
              <button
                onClick={() => clickDeleteFromWatchlist(series.series_id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyWatchlistTab;
