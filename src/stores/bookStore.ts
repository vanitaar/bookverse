import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

interface Book {
  id: number;
  title: string;
  author_id: number;
  image_url?: string;
  blurb?: string;
  dedication?: string;
  publication_date?: Date;
  format_ebook?: boolean;
  format_physical?: boolean;
  format_audio?: boolean;
  series_id?: number; // REFERENCES Series(id),
  order_in_series?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface BookState {
  books: Book[];
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  clearBooks: () => void;
}

const bookStore = createStore(
  persist<BookState>(
    (set) => ({
      books: [],
      setBooks: (books) => set({ books }),
      addBook: (book) => set((state) => ({ books: [...state.books, book] })),
      clearBooks: () => set({ books: [] }),
    }),
    {
      name: "book-storage", // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // using localStorage to persist book state
    }
  )
);

const useBookStore = () => useStore(bookStore);

export default useBookStore;
export { bookStore };
