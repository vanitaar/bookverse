// const AuthorBookPage = () => {
//   return <div className="mt-20">AuthorBookPage</div>;
// };
import React from "react";
import { useParams } from "react-router-dom";
import { fetchAuthorBookDetails } from "../utils/apiBookClient";
import {
  AuthorDetailsData,
  BookSearchResult,
  StatusUpdate,
} from "../types/dataTypes";
import { useQuery } from "@tanstack/react-query";

const AuthorBookPage: React.FC = () => {
  //provide default string type in case undefined to resolve type error
  const { authorUsername = "" } = useParams<{ authorUsername: string }>();
  const {
    data: authorData,
    isLoading,
    error,
  } = useQuery<AuthorDetailsData | null, Error>({
    queryKey: ["authorDetails", authorUsername], // Query key
    queryFn: () => fetchAuthorBookDetails(authorUsername), // Query function
    enabled: !!authorUsername,
  });
  if (isLoading) {
    return <div className="mt-20">Loading...{authorUsername}</div>;
  }

  if (error) {
    return <div className="mt-20">Error: {error.message}</div>;
  }

  if (!authorData) {
    return <div className="mt-20">Loading Data...</div>;
  }

  const { completeSeries, incompleteSeries, standalones, statusUpdates } =
    authorData;

  const clickWatchSeries = (seriesTitle: string) => {
    console.log(`Add to watchSeries: ${seriesTitle}`);
  };

  const renderBooks = (books: BookSearchResult[], title: string) => (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book: BookSearchResult) => (
          <div
            key={book.id}
            className="card bg-base-100 shadow-xl border border-lime-500"
          >
            {book.image_url && (
              <figure className="h-48 w-full overflow-hidden">
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="w-36 h-48 object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <h3 className="card-title text-lime-500">{book.title}</h3>
              {book.series_title && (
                <p className="text-gray-400">
                  Series: {book.series_title}{" "}
                  <i>(Book {book.order_in_series})</i>
                  <button
                    onClick={() =>
                      book.series_title && clickWatchSeries(book.series_title)
                    }
                    className="btn bg-amber-400 text-stone-700 btn-sm ml-4 hover:text-rose-400"
                  >
                    Watch Series
                  </button>
                </p>
              )}
              <p className="text-slate-300">Blurb: {book.blurb}</p>
              <p className="text-slate-300">Dedication: {book.dedication}</p>
              <p className="text-gray-400">
                Publication Date:{" "}
                {book.publication_date
                  ? new Date(book.publication_date).toLocaleDateString()
                  : "N/A"}
                {/* {book.publication_date?.toLocaleString()} */}
                {/* {new Date(book.publication_date).toLocaleDateString()} */}
              </p>
              <p className="text-gray-400">
                Formats: {book.format_ebook && "Ebook"}{" "}
                {book.format_physical && "Physical"}{" "}
                {book.format_audio && "Audio"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="bg-lime-500 text-white py-10 rounded-lg mb-10">
        <h1 className="text-4xl font-bold text-center">{authorUsername}</h1>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Status</h2>
        <ul>
          {statusUpdates.map((statusUpdate: StatusUpdate) => (
            <li key={statusUpdate.id} className="mb-4">
              <div className="bg-teal-300 p-4 rounded-lg">
                <p className="text-gray-900">{statusUpdate.status}</p>
                <p className="text-gray-800">
                  Updated At:{" "}
                  {new Date(statusUpdate.created_at).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {renderBooks(completeSeries, "Complete Series")}
      {renderBooks(incompleteSeries, "Incomplete Series")}
      {renderBooks(standalones, "Standalones")}
    </div>
  );
};

export default AuthorBookPage;
