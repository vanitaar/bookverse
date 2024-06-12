import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchReaderWatchlist } from "../../../utils/apiWatchlistClient";
import { WatchlistSeries } from "../../../types/dataTypes";
import useWatchlistStore from "../../../stores/watchSeriesStore";
import useAuthStore from "../../../stores/authStore";

const MyWatchlistTab: React.FC = () => {
  const { setWatchlist } = useWatchlistStore();
  const { user } = useAuthStore();

  const { data, isLoading, error } = useQuery<WatchlistSeries[], Error>({
    queryKey: ["readerWatchlist"],
    queryFn: fetchReaderWatchlist,
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

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-semibold mb-4">My Watchlist</h2>
      <ul>
        {data?.map((series) => (
          <li key={series.id} className="mb-4">
            <div>
              <h3 className="text-lg font-semibold">{series.series_title}</h3>
              <p>Author: {series.author_username}</p>
              <p>Status: {series.series_status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyWatchlistTab;
// import React, { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchReaderWatchlist } from "../../../utils/apiWatchlistClient";
// import { WatchlistSeries } from "../../../types/dataTypes";
// import useWatchlistStore from "../../../stores/watchSeriesStore";

// const MyWatchlistTab: React.FC = () => {
//   const { setWatchlist } = useWatchlistStore();

//   const { data, isLoading, error } = useQuery<WatchlistSeries[]>({
//     queryKey: ["readerWatchlist"],
//     queryFn: fetchReaderWatchlist,
//     // onSuccess: (data) => {
//     //   const seriesIds = data.map((series) => series.series_id);
//     //   setWatchlist(seriesIds);
//     // },
//   });

//   useEffect(() => {
//     const onSuccess = (data: WatchlistSeries[]) => {
//       const seriesIds = data.map((series) => series.series_id);
//       setWatchlist(seriesIds);
//     };
//     if (!isLoading && !error && data) {
//       onSuccess(data);
//     }
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {(error as Error).message}</div>;
//   }

//   return (
//     <div className="mt-20">
//       <h2 className="text-2xl font-semibold mb-4">My Watchlist</h2>
//       <ul>
//         {data?.map((series) => (
//           <li key={series.id} className="mb-4">
//             <div>
//               <h3 className="text-lg font-semibold">{series.series_title}</h3>
//               <p>Author: {series.author_username}</p>
//               <p>Status: {series.series_status}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyWatchlistTab;
