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
      <h1 className="text-3xl font-bold mb-6">My Booklist</h1>
      <Link to="/dashboard/add-book">
        <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md mb-6">
          Add Book
        </button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data &&
          data.map((book) => (
            <div key={book.id} className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-lg font-semibold mb-2 text-red-500">
                {book.title}
              </h2>
              {book.image_url && (
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="w-full h-40 object-cover mb-2 rounded-md"
                />
              )}
              <p className="text-gray-700 mb-4">Blurb: {book.blurb}</p>
              {/* <Link to={`/dashboard/edit-book/${book.id}`}>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded-md mr-2">
                  Edit
                </button>
              </Link>
              <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md">
                Delete
              </button> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyBooklistTab;
