import { Book } from "../types/dataTypes";

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

  return response.json();
};

export const addNewBook = async (
  authorId: number,
  bookData: Omit<Book, "id">
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
