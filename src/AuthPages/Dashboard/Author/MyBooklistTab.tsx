import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/authStore";
import useBookStore from "../../../stores/bookStore";
import { fetchBooksByAuthor } from "../../../utils/apiBookClient";
import { Book } from "../../../types/dataTypes";
import { useEffect } from "react";

const MyBooklistTab = () => {
  const { user } = useAuthStore();
  const { setBooks } = useBookStore();

  const authorId = Number(user?.id);

  const { data, isLoading, error } = useQuery<Book[], Error>({
    queryKey: ["books", authorId],
    queryFn: () => fetchBooksByAuthor(authorId),
    // onSuccess: (data: Book[]) => {
    //   setBooks(data);
    // },
  });

  // Use the onSuccess callback provided by the useQuery hook
  useEffect(() => {
    const onSuccess = (data: Book[]) => {
      setBooks(data);
    };

    if (!isLoading && !error && data) {
      onSuccess(data);
    }
  }, [data, isLoading, error, setBooks]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-20">
      <h1>My Booklist</h1>
      <Link to="/dashboard/add-book">
        <button>Add Book</button>
      </Link>
      <ul>
        {data &&
          data.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>{book.blurb}</p>
              {book.image_url && <img src={book.image_url} alt={book.title} />}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MyBooklistTab;
