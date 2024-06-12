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

  const { books, statusUpdates } = authorData;

  return (
    <div className="mt-20">
      <h1>{authorUsername}</h1>
      <h2>Books</h2>
      <ul>
        {books.map((book: BookSearchResult) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>Dedication: {book.dedication}</p>
            <p>{book.blurb}</p>
            <img src={book.image_url} alt={book.title} />
            <p>Publication Date: {book.publication_date?.toLocaleString()}</p>
            <p>
              Formats:{" "}
              {`${book.format_ebook ? "Ebook" : ""} ${book.format_physical ? "Physical" : ""} ${book.format_audio ? "Audio" : ""}`}
            </p>
          </li>
        ))}
      </ul>
      <h2>Status Updates</h2>
      <ul>
        {statusUpdates.map((statusUpdate: StatusUpdate) => (
          <li key={statusUpdate.id}>
            <p>{statusUpdate.status}</p>
            <p>
              Updated At: {new Date(statusUpdate.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorBookPage;
