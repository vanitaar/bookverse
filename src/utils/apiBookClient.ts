import { Book, BookSearchResult } from "../types/dataTypes";

export const fetchBooksByAuthor = async (authorId: number): Promise<Book[]> => {
  const response = await fetch(`api/authors/${authorId}/booklist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", //include res.cookies in req
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books by author");
  }

  //   return response.json();
  const books: Book[] = await response.json();

  // Normalize the publication_date field
  return books.map((book) => ({
    ...book,
    publication_date: book.publication_date
      ? new Date(book.publication_date)
      : undefined,
  }));
};

export const addNewBook = async (
  authorId: number,
  bookData: Partial<Book>
): Promise<Book> => {
  const response = await fetch(`/api/authors/${authorId}/booklist/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
    credentials: "include", //include res.cookies in req
  });

  if (!response.ok) {
    throw new Error("Failed to add new book");
  }

  return response.json();
};

export const searchBooks = async (
  query: string
): Promise<BookSearchResult[]> => {
  const response = await fetch(
    `/api/books/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  const data = await response.json();
  return data;
};
