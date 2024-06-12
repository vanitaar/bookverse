import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { BookSearchResult } from "../types/dataTypes";
import { searchBooks } from "../utils/apiBookClient";

const LandingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || ""
  );
  // const navigate = useNavigate();

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

  return (
    <div className="mt-20">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, author, or dedication"
        />
        <button type="submit">Search</button>
      </form>

      {searchResults && (
        <div>
          {searchResults.map((book) => (
            <div key={book.id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Dedication: {book.dedication}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
