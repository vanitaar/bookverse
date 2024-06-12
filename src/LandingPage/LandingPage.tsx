import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BookSearchResult } from "../types/dataTypes";
import { searchBooks } from "../utils/apiBookClient";

const LandingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || ""
  );
  const navigate = useNavigate();

  const { data: searchResults, refetch } = useQuery<BookSearchResult[], Error>({
    queryKey: ["search", searchQuery],
    queryFn: () => searchBooks(searchQuery),

    enabled: false, // Disable automatic refetching
  });

  useEffect(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery, refetch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
      refetch();
    } else {
      setSearchParams({});
    }
  };

  const handleCardClick = (authorUsername: string) => {
    navigate(`/author/${authorUsername}`);
    console.log(authorUsername);
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <div
        className="hero bg-teal-500 text-white"
        style={{
          backgroundImage: "src/assets/images/logo/icons8-books-100.png",
        }}
      >
        <div className="hero-overlay bg-opacity-0" />
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to BookVerse!</h1>
          <p className="text-lg mb-6">Navigate your bookish galaxy</p>
        </div>
      </div>
      <form onSubmit={handleSearch} className="mt-20 mb-6 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, author, or dedication"
          className="input input-bordered w-full max-w-xs rounded-l px-4 py-2 text-lg border-lime-500"
          style={{ borderRight: "none" }}
        />
        <button
          type="submit"
          className="btn rounded-r px-4 py-2 text-lg bg-lime-500 text-white"
        >
          Search
        </button>
      </form>

      {searchResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((book) => (
            <div
              key={book.id}
              className="card card-compact bg-base-100 shadow-xl border border-lime-500 cursor-pointer hover:border-teal-400"
              onClick={() => handleCardClick(book.author)}
            >
              {book.image_url && (
                <figure className="h-48 w-full overflow-hidden">
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
              )}
              <div className="card-body">
                <h3 className="card-title text-lime-500">{book.title}</h3>
                <p className="text-gray-400">Author: {book.author}</p>
                <p className="text-gray-300">Dedication: {book.dedication}</p>
                <div className="mt-2">
                  <p className="font-semibold">Formats Available:</p>
                  <ul className="list-disc list-inside text-gray-400">
                    {book.format_ebook && <li>Ebook</li>}
                    {book.format_physical && <li>Physical</li>}
                    {book.format_audio && <li>Audio</li>}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
